// import {useRoute} from "@react-navigation/native";
// import {
//   cloneElement,
//   memo,
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import {PanGestureHandler} from "react-native-gesture-handler";
// import Animated, {
//   Extrapolation,
//   Layout,
//   interpolate,
//   runOnJS,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";
// import {heightPercentageToDP as hp} from "react-native-responsive-screen";
// import IconENT from "react-native-vector-icons/Entypo";
// import {batch, useDispatch, useSelector} from "react-redux";
// import styled from "styled-components";
// import {
//   toggleCollapse,
//   toggleScrollEnable,
// } from "../../../features/transactions/TransactionsSlice";
// import {
//   horizontalScale,
//   moderateScale,
//   verticalScale,
// } from "../../../utils/Metrics";
// import {dateFormat} from "../../../utils/datesFormat";
// import CustomText from "../../shared/custom-text/CustomText";
// import CustomTextSemiBold from "../../shared/custom-text/CustomTextSemiBold";
// import TransactionList from "./TransactionList";

// const MAX_DOWNWARD_TRANSLATE_Y = 0; // numero de pixeles mínimos para translateY.
// const DRAG_THRESHOLD = 50; // determina el numero de pixeles necesarios para que se traslade el bottom sheet de manera automática hacia arriba o abajo.

// const Transactions = ({
//   animateTranslateY,
//   maxUpwardTranslateY,
//   totalHeight,
//   data,
//   isLoading,
//   filters,
//   emptyList,
//   transactionItem,
//   alwaysShowFilters,
//   disableButton,
//   disableAnimation,
// }) => {
//   /* Dispatch de Redux */
//   const dispatch = useDispatch();
//   /* Valida si el bottom sheet se encuentra desplegado */
//   const {isCollapsed} = useSelector(state => state.transactions);

//   const [position, setPosition] = useState("down");

//   const [searchParam, setSearchParam] = useState(null);

//   const route = useRoute();

//   const params = route.params;

//   const isLoan = params?.hasOwnProperty("loan");

//   const listTranslation = useSharedValue(1);

//   const toggleTransactions = direction => {
//     "worklet";
//     animateTranslateY.value = withSpring(direction, {
//       stiffness: 100,
//       damping: 50,
//     });
//   };

//   const positionTransactions = useCallback(position => {
//     setPosition(position);
//   }, []);

//   const gestureHandler = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.startY = animateTranslateY.value;
//     },
//     onActive: (event, ctx) => {
//       animateTranslateY.value = event.translationY + ctx.startY;
//       animateTranslateY.value = Math.max(
//         animateTranslateY.value,
//         maxUpwardTranslateY,
//       );
//     },
//     onEnd: event => {
//       if (event.translationY < 0) {
//         if (event.translationY < -DRAG_THRESHOLD) {
//           runOnJS(positionTransactions)("up");
//           toggleTransactions(maxUpwardTranslateY);
//         } else {
//           runOnJS(positionTransactions)("down");
//           toggleTransactions(MAX_DOWNWARD_TRANSLATE_Y);
//         }
//       } else {
//         if (event.translationY > DRAG_THRESHOLD) {
//           runOnJS(positionTransactions)("down");
//           toggleTransactions(MAX_DOWNWARD_TRANSLATE_Y);
//         } else {
//           runOnJS(positionTransactions)("up");
//           toggleTransactions(maxUpwardTranslateY);
//         }
//       }
//     },
//   });

//   const animateStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: interpolate(
//             animateTranslateY.value,
//             [maxUpwardTranslateY, MAX_DOWNWARD_TRANSLATE_Y],
//             [maxUpwardTranslateY, 0],
//             Extrapolation.CLAMP,
//           ),
//         },
//       ],
//     };
//   });

//   useEffect(() => {
//     if (position === "up") {
//       batch(() => {
//         dispatch(toggleScrollEnable(false));
//         dispatch(toggleCollapse(true));
//       });
//       return;
//     }

//     if (position === "down") {
//       batch(() => {
//         dispatch(toggleCollapse(false));
//         dispatch(toggleScrollEnable(true));
//       });
//       return;
//     }
//   }, [position]);

//   /* Función para manejar el botón de mostrar mas/menos */
//   const handlePress = () => {
//     if (!isCollapsed) {
//       setPosition("up");
//     } else {
//       setPosition("down");
//     }
//   };

//   useEffect(() => {
//     if (isCollapsed) {
//       toggleTransactions(maxUpwardTranslateY);
//     } else {
//       toggleTransactions(MAX_DOWNWARD_TRANSLATE_Y);
//     }
//   }, [isCollapsed]);

//   const filterData = useMemo(() => {
//     if (searchParam) {
//       return data?.filter(
//         transaction =>
//           transaction.description
//             .toLowerCase()
//             .includes(searchParam?.toLowerCase()) ||
//           dateFormat(transaction.date)
//             .toLowerCase()
//             .includes(searchParam?.toLowerCase()) ||
//           (isLoan
//             ? transaction.amount
//                 .toString()
//                 .toLowerCase()
//                 .includes(searchParam?.toLowerCase())
//             : transaction.debit
//                 .toString()
//                 .toLowerCase()
//                 .includes(searchParam?.toLowerCase()) ||
//               transaction.credit
//                 .toString()
//                 .toLowerCase()
//                 .includes(searchParam?.toLowerCase())),
//       );
//     }

//     return data;
//   }, [data, searchParam]);

//   return (
//     <Bottom style={animateStyle} newHeight={totalHeight}>
//       <PanGestureHandler onGestureEvent={!disableAnimation && gestureHandler}>
//         <HeaderContainer>
//           <Line />
//           <Header>
//             <HeaderLeft>
//               <HeaderText>Transacciones</HeaderText>
//             </HeaderLeft>
//             <HeaderRight>
//               {!disableButton && (
//                 <VerTodas onPress={() => handlePress()}>
//                   {!isCollapsed ? <Icon name="plus" /> : <Icon name="minus" />}
//                   <VerTodasText>
//                     {!isCollapsed ? "Ver Más" : "Ver Menos"}
//                   </VerTodasText>
//                 </VerTodas>
//               )}
//             </HeaderRight>
//           </Header>

//           {/* {isCollapsed ? <FiltrosBusqueda {...filtros} /> : null} */}
//           {isCollapsed || alwaysShowFilters
//             ? cloneElement(filters, {
//                 searchParam,
//                 setSearchParam,
//                 listTranslation,
//               }) || null
//             : null}
//         </HeaderContainer>
//       </PanGestureHandler>
//       <Body layout={Layout.duration(500)}>
//         <TransactionList
//           data={filterData}
//           isLoading={isLoading}
//           isCollapsed={isCollapsed}
//           setPosition={setPosition}
//           emptyList={emptyList}
//           transactionItem={transactionItem}
//           listTranslation={listTranslation}
//         />
//       </Body>
//     </Bottom>
//   );
// };

// export default memo(Transactions);

// const Bottom = styled(Animated.View)`
//   flex: 1;
//   min-height: ${props => (props.newHeight ? props.newHeight + "px" : "auto")};
//   background-color: ${props => props.theme.BACKGROUND_COLOR};
//   border-top-left-radius: 25px;
//   border-top-right-radius: 25px;
// `;

// const HeaderContainer = styled(Animated.View)``;

// const Header = styled.View`
//   justify-content: space-between;
//   padding-horizontal: ${horizontalScale(15)}px;
//   padding-bottom: ${verticalScale(10)}px;
//   flex-direction: row;
//   align-items: center;
// `;

// const Line = styled.View`
//   height: ${hp(1)}px;
//   width: 70px;
//   background-color: ${props => props.theme.GRAY_BACKGROUND};
//   border-radius: 100px;
//   margin-top: 15px;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const Body = styled.SafeAreaView`
//   flex: 1;
//   z-index: -99;
// `;

// const HeaderLeft = styled.View``;

// const HeaderRight = styled.View``;

// const HeaderText = styled(CustomTextSemiBold)`
//   font-size: ${moderateScale(17)}px;
//   color: ${props => props.theme.NORMAL_COLOR};
//   /* font-weight: bold; */
// `;

// const VerTodas = styled.TouchableOpacity`
//   padding-vertical: ${verticalScale(5)}px;
//   padding-horizontal: ${horizontalScale(10)}px;
//   background-color: ${props => props.theme.GRAY_BACKGROUND};
//   border-radius: 100px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;

// const VerTodasText = styled(CustomText)`
//   color: ${props => props.theme.NORMAL_COLOR};
//   font-size: ${moderateScale(12)}px;
// `;

// const Icon = styled(IconENT)`
//   margin-right: ${horizontalScale(5)}px;
//   color: ${props => props.theme.NORMAL_COLOR};
// `;
