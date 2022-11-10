import React from 'react'
import Tooltip from 'react-native-walkthrough-tooltip'
import { TouchableWithoutFeedback } from 'react-native'

type TooltipProps = {
  children: JSX.Element
  content: JSX.Element
  setTooltipIsOpen: Function
  tooltipIsOpen: boolean
}

const EmojiTooltip = ({children, content, setTooltipIsOpen, tooltipIsOpen}: TooltipProps) => {



  return (
    <Tooltip
      isVisible={tooltipIsOpen}
      content={content}
      placement="top"
      onClose={() =>setTooltipIsOpen(false)}
      backgroundColor='rgba(0,0,0,0)'
      arrowSize={{ width: 0, height: 0}}
      displayInsets={{ top: 24, bottom: 24, left: 24, right: 20 }}
      disableShadow
      contentStyle={{ backgroundColor: '#8463DF', borderRadius: 10,  }}

    >
      <TouchableWithoutFeedback onPress={() => setTooltipIsOpen(true)}>
        {children}
      </TouchableWithoutFeedback>
    </Tooltip>
  )
}

export default EmojiTooltip