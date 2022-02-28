import { AmountAbbrevication } from "../models/figure";

export enum abbrevations {
    thousand="K",
    million="M",
    billion="B",
    Trillion="T"
}

export const amountAbbrevications: AmountAbbrevication[] = [{ abbrev: abbrevations.Trillion, value: 1000000000000 }, { abbrev: abbrevations.billion, value: 1000000000 }, { abbrev: abbrevations.million, value: 1000000 }, { abbrev: abbrevations.thousand, value: 1000 }]