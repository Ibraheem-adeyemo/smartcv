import { useToast } from "@chakra-ui/react"
import { error } from "@chakra-ui/utils"
import React, { useMemo, useEffect } from "react"
import { DropdownSearchFilter } from "."
import { SkeletonLoader } from ".."
import { channels } from "../../constants"

export default function ChannelFilter(_props: any) {
    const Filter = useMemo(() => DropdownSearchFilter, [])
    const toast = useToast()
    // let error = ;
    // useEffect(() => {
    //     if (typeof error !== "undefined") {
    //         toast({
    //             title: error,
    //             status: "error",
    //             isClosable: true,
    //             variant: "left-accent"
    //         })
    //     }
    // }, [error])

    return (
        <>
            {typeof channels !== "undefined" &&
                <Filter data={channels.map((x, i) => ({ value: x, label: x, selected: i === 0 ? true : false }))
                } label="Channel" />
            }
            {
                typeof channels === "undefined" && typeof error === "undefined" && <SkeletonLoader rows={1} columns={1} width="100px" height="30px" />
            }
        </>
    )
}