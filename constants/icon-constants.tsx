import Icon from "@chakra-ui/icon"
import {IoGridOutline, IoNewspaperOutline} from "react-icons/io5"
import {FiUsers} from "react-icons/fi"
import {HiOutlineClipboardList} from 'react-icons/hi'
import {AiOutlineAudit} from 'react-icons/ai'

import {BsGear} from 'react-icons/bs'


export const dashboardIcon = () => <Icon as = {IoGridOutline} />

export const terminalsIcon = () => <Icon as={FiUsers} />

export const reportingIcon = () => <Icon as={IoNewspaperOutline} />

export const userManagementIcon = () => <Icon as={HiOutlineClipboardList} />

export const auditIcon = () =><Icon as={AiOutlineAudit} />

export const systemSettingsIcon = () => <Icon as={BsGear} />