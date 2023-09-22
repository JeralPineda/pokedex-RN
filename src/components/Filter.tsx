// import {memo, useRef, useState} from "react";
// import {Platform} from "react-native";
// import DateTimePicker from "react-native-modal-datetime-picker";
// import Animated, {
//   FadeIn,
//   FadeOut,
//   interpolate,
//   useAnimatedStyle,
// } from "react-native-reanimated";
// import {useDispatch, useSelector} from "react-redux";
// import styled, {useTheme} from "styled-components";
// import {
//   setDateEnd,
//   setDateStart,
// } from "../../../../features/transactions/TransactionsSlice";
// import {verticalScale} from "../../../../utils/Metrics";
// import FilterRange from "./FilterRange";
// import FilterSearch from "./FilterSearch";
// import FilterSearchIcon from "./FilterSearchIcon";

// const FILTER_HEIGHT = verticalScale(55);

// const Filters = ({searchParam, setSearchParam, listTranslation}) => {
//   const [openDesde, setOpenDesde] = useState(false);
//   const [openHasta, setOpenHasta] = useState(false);

//   const [isSearch, setIsSearch] = useState(false);

//   const isAnimated = useRef(false);

//   const dispatch = useDispatch();

//   const theme = useTheme();

//   const isDark = theme.NORMAL_COLOR === "rgba(255,255,255,0.8)";

//   const {dateStart, dateEnd} = useSelector(state => state.transactions);

//   const handleSearchPress = () => {
//     setIsSearch(prev => !prev);
//     if (isSearch) {
//       isAnimated.current = true;
//       setSearchParam(null);
//     }
//   };

//   const styles = useAnimatedStyle(() => ({
//     height: interpolate(listTranslation.value, [0, 1], [0, FILTER_HEIGHT]),
//   }));

//   const animatedStyleInnerContainer = useAnimatedStyle(() => ({
//     opacity: interpolate(listTranslation.value, [0, 1], [0, 1]),
//     transform: [
//       {translateY: interpolate(listTranslation.value, [0, 1], [-30, 0])},
//     ],
//   }));

//   return (
//     <Container entering={FadeIn} exiting={FadeOut} style={styles}>
//       <InnerContainer style={animatedStyleInnerContainer}>
//         {isSearch && (
//           <FilterSearch
//             setSearchParam={setSearchParam}
//             searchParam={searchParam}
//           />
//         )}

//         {!isSearch && (
//           <FilterRange
//             isAnimated={isAnimated}
//             dateStart={dateStart}
//             dateEnd={dateEnd}
//             setOpenDesde={setOpenDesde}
//             setOpenHasta={setOpenHasta}
//           />
//         )}

//         <FilterSearchIcon
//           handleSearchPress={handleSearchPress}
//           isSearch={isSearch}
//         />
//       </InnerContainer>
//       <DateTimePicker
//         locale="es-ES"
//         confirmTextIOS="Confirmar"
//         cancelTextIOS="Cancelar"
//         display={Platform.OS === "ios" ? "inline" : "default"}
//         buttonTextColorIOS={theme.NORMAL_COLOR}
//         textColor={theme.NORMAL_COLOR}
//         isDarkModeEnabled={isDark}
//         themeVariant={isDark ? "dark" : "light"}
//         accentColor={theme.PRIMARY_COLOR}
//         mode="date"
//         is24Hour={true}
//         date={dateStart}
//         maximumDate={new Date()}
//         isVisible={openDesde}
//         onConfirm={date => {
//           setOpenDesde(false);
//           dispatch(setDateStart(date));
//         }}
//         onCancel={() => setOpenDesde(false)}
//       />

//       <DateTimePicker
//         locale="es-ES"
//         confirmTextIOS="Confirmar"
//         cancelTextIOS="Cancelar"
//         display={Platform.OS === "ios" ? "inline" : "default"}
//         buttonTextColorIOS={theme.NORMAL_COLOR}
//         textColor={theme.NORMAL_COLOR}
//         accentColor={theme.PRIMARY_COLOR}
//         mode="date"
//         is24Hour={true}
//         maximumDate={new Date()}
//         isVisible={openHasta}
//         isDarkModeEnabled={isDark}
//         themeVariant={isDark ? "dark" : "light"}
//         onConfirm={date => {
//           setOpenHasta(false);
//           dispatch(setDateEnd(date));
//         }}
//         onCancel={() => setOpenHasta(false)}
//       />
//     </Container>
//   );
// };

// export default memo(Filters);

// const Container = styled(Animated.View)`
//   z-index: -9;
//   border-bottom-width: ${verticalScale(1)}px;
//   border-color: ${props => props.theme.GRAY_BACKGROUND};
//   overflow: hidden;
// `;

// const InnerContainer = styled(Animated.View)`
//   flex-direction: row;
//   padding-horizontal: ${verticalScale(15)}px;
//   margin-bottom: ${verticalScale(5)}px;
// `;
