import { Button } from "@chakra-ui/react";
import { filter, map, some } from "lodash";
import { NextComponentType } from "next";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import React, { useContext } from "react";
import { appDate } from "../../lib";
import { AuditView } from "../../models";
import { AuditContext } from "../../providers";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const AuditExport: NextComponentType = () => {
    const { auditView, columns} = useContext(AuditContext)

    return (
        <Button variant="primary-button" px="53px" py="8px" onClick={()=> {
          
            if(typeof auditView !== "undefined"){
                const keynames = filter(map(columns, (x) => x.name), (x) => x !== "")
                
                const values = map(auditView, (x) => {
                    return map(columns, (y) =>  {
                        if(typeof y.ele !== "undefined") {
                            switch(y.ele) {
                                case "datetime":
                                    return appDate(x[y.key as keyof AuditView] as string)
                                case "date":
                                    return appDate(x[y.key as keyof AuditView] as string, false)
                            }
                        }
                        return x[y.key as keyof AuditView]
                    })
                })

                // const values = [map(...keys, (x) => )]
                const docDefinition: TDocumentDefinitions = {
                    watermark: { text: 'Interswitch', color: 'blue', opacity: 0.3, bold: true, italics: false },
                    content: [
                        {
                            text:"Audit",
                            style:"header"
                        },
                        "The table below shows the audit for activities from PAAS",
                        {
                            style:"tableExample",
                            table: {
                                body: [
                                    keynames,
                                    ...values
                                ]
                            }
                        }
                    ],
                    styles: {
                        header: {
                            fontSize: 18,
                            bold: true,
                            margin: [0, 0, 0, 10]
                        },
                        subheader: {
                            fontSize: 16,
                            bold: true,
                            margin: [0, 10, 0, 5]
                        },
                        tableExample: {
                            margin: [0, 5, 0, 15]
                        },
                        tableHeader: {
                            bold: true,
                            fontSize: 13,
                            color: 'black'
                        }
                    },
                    defaultStyle: {
                        // alignment: 'justify'
                    }
                }

                pdfMake.createPdf(docDefinition).open();
            }

        }}>Export</Button>
    )
}

export default AuditExport