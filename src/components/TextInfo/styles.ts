import {StyleSheet} from 'react-native'
import normalize from 'react-native-normalize'

export const styles = StyleSheet.create({
  body: {
    backgroundColor: 'rgba(148, 119, 229, 0.42)',
    paddingHorizontal: normalize(18),
    paddingVertical: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(10),
  },
  text: {
    fontSize: normalize(11),
    lineHeight: normalize(15),
    fontWeight: '400',
    fontFamily: 'System',
    color: 'rgba(190, 170, 245, 1)',
    marginLeft: normalize(10),
    flexShrink: 1,
  },
})
