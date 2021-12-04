import React, { useMemo } from "react";
import { Alert, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CoinButton } from "../shared/Buttons";
import { COLORS, FORMS, SIZES } from "../../utils/consts";

const CoinSelectorModal = ({mode, onClose, onSelect, usedCoins}) => {
  const ModalCoinButton = (props) => {
    const handleCoinPress = () => {
      onSelect(props)
      onClose()
    }
    return (<CoinButton {...props} onPress={handleCoinPress}/>)
  }

  const colors = useMemo(() => COLORS[mode] ? {[mode]: mode} : COLORS)
  const forms = useMemo(() => FORMS[mode] ? {[mode]: mode} : FORMS)
  const sizes = useMemo(() => SIZES[mode] ? {[mode]: mode} : SIZES)

  return (<Modal
    animationType="none"
    transparent={true}
    visible={!!mode}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      onClose();
    }}
  >
    <TouchableOpacity onPress={onClose} style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text>Выберите монетку:</Text>
        {Object.values(colors).map(color => {
          return (<View key={color} style={!COLORS[mode] && styles.row}>
            {Object.values(forms).map(form => {
              return <View key={form} style={styles.row}>
                {Object.values(sizes).map(size => {
                  const isCoinUsed = usedCoins.some(usedCoin =>
                    usedCoin.color === color &&
                    usedCoin.form === form &&
                    usedCoin.size === size
                  )
                  return (<View key={size} style={styles.buttonContainer}>
                    {!isCoinUsed && <ModalCoinButton key={`${color}_${form}_${size}`} color={color} form={form} size={size}/>}
                  </View>)
                })}
              </View>
            })}
          </View>)
        })}
      </View>
    </TouchableOpacity>
  </Modal>);
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalView: {
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    width: '80%',
    height: '40%',
  }, buttonContainer: {
    flex: 1, margin: 5, alignItems: 'center', // borderWidth: 1
  }, row: {
    flex: 1, width: '100%', // borderWidth: 1,
    flexDirection: "row"
  }
});

export default CoinSelectorModal;
