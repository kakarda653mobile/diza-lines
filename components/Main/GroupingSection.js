import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from "react-native";
import {
  CircleFormGroupingButton, HexagonFormGroupingButton, SquareFormGroupingButton, SelectButton,
  PinkColorGroupingButton, YellowColorGroupingButton, BlueColorGroupingButton, SmallSizeGroupingButton,
  MediumSizeGroupingButton, BigSizeGroupingButton
} from "../shared/Buttons";
import CoinSelectorModal from "./CoinSelectorModal";
import { SIZES,FORMS, COLORS } from "../../utils/consts";

const GroupingSection = ({mode, onChangeMode, onSelectCoin, usedCoins}) => {

  const [coinSelectorModalMode, setCoinSelectorModalMode] = useState('')
  // const [selectedCoin, setSelectedCoin] = useState('');


  const handleOpenCoinSelectorModal = (type) => () => {
    setCoinSelectorModalMode(type)
  }

  const handleCloseCoinSelectorModal = () => {
    setCoinSelectorModalMode('')
  }

  const FirstButton = () => {
    let Button = <SquareFormGroupingButton onPress={handleOpenCoinSelectorModal(FORMS.SQUARE)}/>
    if (mode === 2) Button = <PinkColorGroupingButton onPress={handleOpenCoinSelectorModal(COLORS.PINK)}/>
    if (mode === 3) Button = <SmallSizeGroupingButton onPress={handleOpenCoinSelectorModal(SIZES.S)}/>
    return Button
  }

  const SecondButton = () => {
    let Button = <CircleFormGroupingButton onPress={handleOpenCoinSelectorModal(FORMS.CIRCLE)}/>
    if (mode === 2) Button = <YellowColorGroupingButton onPress={handleOpenCoinSelectorModal(COLORS.YELLOW)}/>
    if (mode === 3) Button = <MediumSizeGroupingButton onPress={handleOpenCoinSelectorModal(SIZES.M)}/>
    return Button
  }

  const ThirdButton = () => {
    let Button = <HexagonFormGroupingButton onPress={handleOpenCoinSelectorModal(FORMS.HEXAGON)}/>
    if (mode === 2) Button = <BlueColorGroupingButton onPress={handleOpenCoinSelectorModal(COLORS.BLUE)}/>
    if (mode === 3) Button = <BigSizeGroupingButton onPress={handleOpenCoinSelectorModal(SIZES.L)}/>
    return Button
  }


  return (
    <View style={styles.container}>
      <ImageBackground resizeMode='contain' style={styles.buttonContainer}
                       source={require('../../assets/images/white_border.png')}>
        <FirstButton/>
      </ImageBackground>
      <ImageBackground resizeMode='contain' style={styles.buttonContainer}
                       source={require('../../assets/images/white_border.png')}>
        <SecondButton/>
      </ImageBackground>
      <ImageBackground resizeMode='contain' style={styles.buttonContainer}
                       source={require('../../assets/images/white_border.png')}>
        <ThirdButton/>
      </ImageBackground>
      <View style={styles.changeModeButtonContainer}>
        <SelectButton mode={mode} onPress={onChangeMode}/>
      </View>
      <CoinSelectorModal mode={coinSelectorModalMode} onClose={handleCloseCoinSelectorModal} onSelect={onSelectCoin} usedCoins={usedCoins}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  changeModeButtonContainer: {
    flex: 1,
  }
})

export default GroupingSection;
