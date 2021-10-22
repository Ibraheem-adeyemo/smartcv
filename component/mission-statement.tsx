import { Box, Image } from "@chakra-ui/react"
import React from "react"
import { Images } from "../constants"
import { BulletContainer, BulletHeader, BulletMessage, LogoContainer, MessageContainer, MissionStatement as MS, TextContainer, TopBanner } from "./custom-component"

const MissionStatement = () => {
    return (
        <MS>
            <LogoContainer>
                <Image src={Images.iswLogo} alt="Interswitch logo" />
            </LogoContainer>
            <TextContainer>
                <TopBanner>
                    Built to help you enhance your <br />
                    service delivery in the following
                    <br />
                    areas
                </TopBanner>

                <BulletContainer>
                    <Image src={Images.bullet} alt="good sign" />

                    <MessageContainer>
                        <BulletHeader>ATM & Transaction monitoring</BulletHeader>
                        <BulletMessage>
                            Set-up new terminals,send downloads to disconnected <br />
                            terminals, realtime transaction monitoring, monitor <br />
                            online/offline/supervisor mode terminals
                        </BulletMessage>
                    </MessageContainer>
                </BulletContainer>

                <BulletContainer>
                    <Image src={Images.bullet} alt="good sign" />

                    <MessageContainer>
                        <BulletHeader>Card operation</BulletHeader>
                        <BulletMessage>
                            Card production, card management functions like
                            <br />
                            Block/Unblock card, PIN reset, card limits, card and <br />
                            account info
                        </BulletMessage>
                    </MessageContainer>
                </BulletContainer>

                <BulletContainer>
                    <Image src={Images.bullet} alt="good sign" />

                    <MessageContainer>
                        <BulletHeader>Best in class support</BulletHeader>
                        <BulletMessage>
                            We are positioned as an industry expert with a<br />
                            dedicated request for all your needs and support <br />
                        </BulletMessage>
                    </MessageContainer>
                </BulletContainer>
            </TextContainer>
        </MS>
    )
}

export default MissionStatement