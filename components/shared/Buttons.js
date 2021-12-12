import React, { useMemo } from 'react'
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'

import CircleFormGrouping from '../../assets/images/white_big_circle.png'
import SquareFormGrouping from '../../assets/images/white_big_square.png'
import HexagonFormGrouping from '../../assets/images/white_big_hexagon.png'

import PinkBigCircle from '../../assets/images/pink_big_circle.png'
import PinkBigSquare from '../../assets/images/pink_big_square.png'
import PinkBigHexagon from '../../assets/images/pink_big_hexagon.png'
import YellowBigCircle from '../../assets/images/yellow_big_circle.png'
import YellowBigSquare from '../../assets/images/yellow_big_square.png'
import YellowBigHexagon from '../../assets/images/yellow_big_hexagon.png'
import BlueBigCircle from '../../assets/images/blue_big_circle.png'
import BlueBigSquare from '../../assets/images/blue_big_square.png'
import BlueBigHexagon from '../../assets/images/blue_big_hexagon.png'

import PinkColorGrouping from '../../assets/images/pink_color_grouping.png'
import YellowColorGrouping from '../../assets/images/yellow_color_grouping.png'
import BlueColorGrouping from '../../assets/images/blue_color_grouping.png'

import BigSizeGrouping from '../../assets/images/pink_big_circle.png'

import Select1 from '../../assets/images/select_1.png'
import Select2 from '../../assets/images/select_2.png'
import Select3 from '../../assets/images/select_3.png'
import { COLORS, FORMS, SIZES } from "../../utils/consts";


const Button = ({image, size = SIZES.L, onPress}) => {
  const widthPercent = useMemo(() => {
    let result = 100
    if (size === SIZES.M) result = 85
    if (size === SIZES.S) result = 70
    return `${result}%`
  })
  return (
    <TouchableOpacity style={{width: widthPercent}} onPress={onPress} disabled={!onPress}>
      <Image
        source={image}
        style={styles.image}/>
    </TouchableOpacity>
  )
}

const SelectButton = ({mode, onPress}) => {
  let image = Select1
  if (mode === 2) image = Select2
  if (mode === 3) image = Select3
  return (
    <TouchableOpacity onPress={onPress} style={{width: '100%'}}>
      <Image
        source={image}
        style={[styles.image, styles.selectImage]}/>
    </TouchableOpacity>
  )
}

const selectImagePath = (color, form) => {
  switch (color) {
    case COLORS.PINK:
      switch (form) {
        case FORMS.CIRCLE:
          return PinkBigCircle
        case FORMS.SQUARE:
          return PinkBigSquare
        case FORMS.HEXAGON:
          return PinkBigHexagon
      }
    case COLORS.YELLOW:
      switch (form) {
        case FORMS.CIRCLE:
          return YellowBigCircle
        case FORMS.SQUARE:
          return YellowBigSquare
        case FORMS.HEXAGON:

          return YellowBigHexagon
      }
    case COLORS.BLUE:
      switch (form) {
        case FORMS.CIRCLE:
          return BlueBigCircle
        case FORMS.SQUARE:
          return BlueBigSquare
        case FORMS.HEXAGON:
          return BlueBigHexagon
      }
  }
}

const CoinButton = ({color = COLORS.PINK, size = SIZES.L, form = FORMS.CIRCLE, onPress}) => {
  const image = selectImagePath(color, form)
  return Button({image, size, onPress})
}


const styles = StyleSheet.create({
  image: {
    alignSelf: 'center', width: '85%', height: '100%', resizeMode: 'contain', marginTop: 3
  },
  selectImage: {
    width: '110%'
  }
})

const CircleFormGroupingButton = ({onPress}) => Button({image: CircleFormGrouping, onPress})
const SquareFormGroupingButton = ({onPress}) => Button({image: SquareFormGrouping, onPress})
const HexagonFormGroupingButton = ({onPress}) => Button({image: HexagonFormGrouping, onPress})

const PinkColorGroupingButton = ({onPress}) => Button({image: PinkColorGrouping, onPress})
const YellowColorGroupingButton = ({onPress}) => Button({image: YellowColorGrouping, onPress})
const BlueColorGroupingButton = ({onPress}) => Button({image: BlueColorGrouping, onPress})

const SmallSizeGroupingButton = ({onPress}) => Button({image: BigSizeGrouping, size: SIZES.S, onPress})
const MediumSizeGroupingButton = ({onPress}) => Button({image: BigSizeGrouping, size: SIZES.M, onPress})
const BigSizeGroupingButton = ({onPress}) => Button({image: BigSizeGrouping, size: SIZES.L, onPress})

export {
  CircleFormGroupingButton,
  SquareFormGroupingButton,
  HexagonFormGroupingButton,
  SelectButton,
  PinkColorGroupingButton,
  YellowColorGroupingButton,
  BlueColorGroupingButton,
  SmallSizeGroupingButton,
  MediumSizeGroupingButton,
  BigSizeGroupingButton,
  CoinButton
};
