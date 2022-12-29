import { NextPage } from "next"
import { Authenticated } from "../src/component/layouts"
import {StoreForwardQueue } from '../src/component/Store-forward-queue'

const ForwardQueue:NextPage = () => {
    return (
        <Authenticated pageHeader="Store 'n' Forward Queue" >
            <StoreForwardQueue />
        </Authenticated>
    )
}
export default ForwardQueue