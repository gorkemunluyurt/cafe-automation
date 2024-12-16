import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { showMessage } from "react-native-flash-message";
import { fp, wp, hp } from "../utils/responsive";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useAtomValue } from "jotai";
import { baseUrl } from "../utils/requests";

const UserLevelModal = ({
  closeModal = () => {},
  isModalActive = false,
  selectedUser = {},
}) => {
  const [email, setEmail] = useState("");

  const [selectedRole, setSelectedRole] = useState(""); // Seçilen rolü tutan state

  // Rol seçildiğinde çalışacak fonksiyon
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };
  const changeToAdmin = async () => {
    console.log(selectedUser);
    await axios
      .post(baseUrl + ":3000/updateacces", {
        userid: selectedUser.userid,
        userlevel: "admin",
      })
      .then(() => {
        showMessage({
          type: "success",
          message: "Yetki Seviyesi Değiştirildi",
        });
        closeModal();
      });
  };

  const changeToWorker = async () => {
    console.log(selectedUser);
    await axios
      .post(baseUrl + ":3000/updateacces", {
        userid: selectedUser.userid,
        userlevel: "worker",
      })
      .then(() => {
        showMessage({
          type: "success",
          message: "Yetki Seviyesi Değiştirildi",
        });
        closeModal();
      });
  };

  const deleteUser = async () => {
    console.log(selectedUser);
    await axios
      .post(baseUrl + ":3000/deleteuser", {
        userid: selectedUser.userid,
      })
      .then(() => {
        showMessage({
          type: "success",
          message: "Kullanıcı Silindi",
        });
        closeModal();
      });
  };
  return (
    <Modal
      isVisible={isModalActive}
      style={{ alignSelf: "center", margin: 0 }}
      hideModalContentWhileAnimating
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={styles.modalContent}>
        <Text style={{ fontWeight: "900", fontSize: fp(1.9) }}>
          Lütfen Yetki Düzeyini Seçiniz 🤗
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={changeToAdmin}
          style={{
            width: wp(80),
            paddingVertical: hp(1),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#703eff",
            borderRadius: wp(2),

            marginTop: hp(5),
          }}
        >
          <Text style={{ color: "white", fontWeight: "900", fontSize: fp(2) }}>
            Yönetici Yap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={changeToWorker}
          style={{
            width: wp(80),
            paddingVertical: hp(1),
            justifyContent: "center",
            alignItems: "center",

            borderRadius: wp(2),
            marginVertical: hp(1),
          }}
        >
          <Text style={{ color: "black", fontWeight: "900", fontSize: fp(2) }}>
            Çalışan Yap
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={deleteUser}
          style={{
            width: wp(80),
            paddingVertical: hp(1),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            borderRadius: wp(2),
          }}
        >
          <Text style={{ color: "white", fontWeight: "900", fontSize: fp(2) }}>
            Çalışanı Sil
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default UserLevelModal;

const styles = StyleSheet.create({
  modalContent: {
    height: hp(30),
    width: wp(92),
    backgroundColor: "white",
    borderRadius: wp(5),
    alignItems: "center",
    paddingHorizontal: wp(7),
    paddingTop: hp(3),
  },
  textInputTitle: {
    marginBottom: hp(0.5),
  },
  textInput: {
    width: wp(80),
    padding: hp(1),
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: wp(2),
    marginTop: hp(3),
  },
  inputContainer: {
    marginBottom: hp(4),
  },
});
