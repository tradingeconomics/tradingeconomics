import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"


export const statuses = [
  {
    label: "Active",
    value: true,
    icon: CheckCircledIcon,
  },
  {
    label: 'InActive',
    value: false,
    icon: QuestionMarkCircledIcon,
  },
 
]

export const roles = [
  {
    label: "Owner",
    value: "owner",
    icon: ArrowDownIcon,
  },
  {
    label: "Member",
    value: "member",
    icon: ArrowRightIcon,
  },
 
]
