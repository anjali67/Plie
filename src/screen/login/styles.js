import { StyleSheet } from "react-native";
import appColors from "../../theme/appColors";
import { fontSizes, windowHeight, windowWidth } from "../../theme/appConstant";
import appFonts from "../../theme/appFonts";

export default styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:appColors.lightGray
    },
    innerView:{
        margin:windowHeight(20),
        flex:0.4,
    },
    title:{
        fontSize:windowHeight(30),
        color:appColors.fontColor,
        textAlign:'center' ,
        fontFamily:appFonts.RobotoRegular
    },
    imageView:{
        margin:windowHeight(30),
        alignItems:"center",
    },
    bottomView:{
        backgroundColor:"white",flex:1,
        paddingTop:windowHeight(10),
        borderTopLeftRadius:windowHeight(20),
        borderTopRightRadius:windowHeight(20),
      
    },
    blankView:{
        height:windowHeight(23)
    },
    forgotText: {
          color: appColors.placeholder,
          fontSize: fontSizes.FONT18,
          
        },
        forgotView:{
                flexDirection:"row",
                justifyContent:"flex-end",
                marginVertical:windowHeight(11),
                marginHorizontal:windowHeight(14)
        },
        buttonView:{
         marginTop:windowHeight(27),
         backgroundColor:appColors.button,
         paddingHorizontal:windowHeight(6),
         alignItems:"center",
         justifyContent:"center",
         borderRadius:windowHeight(5),
         paddingVertical:windowHeight(7),
         marginHorizontal:windowWidth(10)
        },
        button:{
            color:appColors.white,
            fontFamily:appFonts.RobotoMedium,
            fontSize:fontSizes.FONT20
        },
        signUp:{
           marginHorizontal:windowHeight(20),
            flexDirection:"row",
            justifyContent:"flex-end",
            bottom:windowHeight(6),
            alignItems:"center"
        },
        signUpText:{
            textDecorationLine:"underline",top:windowHeight(3)
        }
})