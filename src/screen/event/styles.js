import { StyleSheet } from "react-native";
import appColors from "../../theme/appColors";
import { windowHeight } from "../../theme/appConstant";
export default styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor:appColors.white,
    marginVertical:windowHeight(10),
    borderRadius:windowHeight(12),
    marginHorizontal:windowHeight(18)
  },
  heart: {
    fontSize: 24,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },

})