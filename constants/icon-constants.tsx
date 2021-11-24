import Icon from "@chakra-ui/icon"
import {IoGridOutline, IoNewspaperOutline} from "react-icons/io5"
import {FiUsers} from "react-icons/fi"
import {HiOutlineClipboardList, HiChevronDown} from 'react-icons/hi'
import {AiOutlineAudit, AiOutlineSearch, AiOutlineUser} from 'react-icons/ai'
import {FaRegCalendarAlt} from 'react-icons/fa'
import {TiTick} from 'react-icons/ti'
import {MdOutlineInvertColors} from 'react-icons/md'
import {BsGear} from 'react-icons/bs'
import {GiCapitol} from 'react-icons/gi'
import {GoPrimitiveDot} from 'react-icons/go'
import { forwardRef } from "@chakra-ui/system"



export const dashboardIcon =  forwardRef((props, ref) => <Icon as = {IoGridOutline} {...props} ref={ref} />)

export const transactionMonitoringIcon =  forwardRef((props, ref) => <Icon as={FiUsers} {...props} ref={ref} />)

export const channelsMonitoringIcon =  forwardRef((props, ref) => <Icon as={IoNewspaperOutline} {...props} ref={ref} />)

export const userManagementIcon =  forwardRef((props, ref) => <Icon as={HiOutlineClipboardList} {...props} ref={ref} />)

export const auditIcon =  forwardRef((props, ref) =><Icon as={AiOutlineAudit} {...props} ref={ref} />)

export const systemSettingsIcon =  forwardRef((props, ref) => <Icon as={BsGear} {...props} ref={ref} />)

export const DropdownIcon = forwardRef((props, ref) => <Icon as={HiChevronDown} {...props} ref={ref} />)

export const CalendarIcon = forwardRef((props, ref) => <Icon as={FaRegCalendarAlt} {...props} ref={ref} />)

export const TickIcon =  forwardRef((props, ref) => <Icon as={TiTick} {...props} ref={ref} />)

export const PickerIcon =  forwardRef((props, ref) => <Icon as={MdOutlineInvertColors} {...props} ref={ref} />)

export const SearchIcon =  forwardRef((props, ref) => <Icon as={AiOutlineSearch} {...props} ref={ref} />)

export const CapitolIcon =  forwardRef((props, ref) => <Icon as={GiCapitol} {...props} ref={ref} />)

export const AvatarIcon =  forwardRef((props, ref) => <Icon as={AiOutlineUser} {...props} ref={ref} />)

export const DotIcon =  forwardRef((props, ref) => <Icon as={GoPrimitiveDot} {...props} ref={ref} />)
