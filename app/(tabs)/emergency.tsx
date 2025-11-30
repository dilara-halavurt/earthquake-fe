import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

export default function EmergencyFormScreen() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    address: '',
    citizenshipNumber: '',
    buildingFloors: '',
    buildingStatus: '',
    buildingType: '',
    emergencyNeeds: '',
    dangerousSituation: '',
    numberOfPeople: '',
    medicalNeed: false,
    bleedingPatient: false,
    unconsciousPatient: false,
    shockPatient: false,
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://earthquake-be.vercel.app/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Başarılı', 'Form başarıyla gönderildi');
        // Reset form
        setFormData({
          name: '',
          surname: '',
          phoneNumber: '',
          address: '',
          citizenshipNumber: '',
          buildingFloors: '',
          buildingStatus: '',
          buildingType: '',
          emergencyNeeds: '',
          dangerousSituation: '',
          numberOfPeople: '',
          medicalNeed: false,
          bleedingPatient: false,
          unconsciousPatient: false,
          shockPatient: false,
        });
      } else {
        Alert.alert('Hata', 'Form gönderilemedi');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bağlantı hatası');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Acil Durum</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Adınız"
            placeholderTextColor="#999"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Soyadınız"
            placeholderTextColor="#999"
            value={formData.surname}
            onChangeText={(text) => setFormData({ ...formData, surname: text })}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Telefon Numaranız"
          placeholderTextColor="#999"
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Adresiniz"
          placeholderTextColor="#999"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="T.C. Vatandaşlık Numaranız"
          placeholderTextColor="#999"
          value={formData.citizenshipNumber}
          onChangeText={(text) => setFormData({ ...formData, citizenshipNumber: text })}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Bulunduğunuz Bina Kaç Katlı?"
          placeholderTextColor="#999"
          value={formData.buildingFloors}
          onChangeText={(text) => setFormData({ ...formData, buildingFloors: text })}
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <View style={[styles.pickerContainer, styles.halfInput]}>
            <Text style={styles.pickerLabel}>
              {formData.buildingStatus === '' ? 'Binanın Durumu' :
               formData.buildingStatus === 'standing' ? 'Ayakta' :
               formData.buildingStatus === 'damaged' ? 'Hasar Gördü' : 'Yıkıldı'}
            </Text>
            <Picker
              selectedValue={formData.buildingStatus}
              onValueChange={(value) => setFormData({ ...formData, buildingStatus: value })}
              style={styles.picker}
            >
              <Picker.Item label="Binanın Durumu" value="" />
              <Picker.Item label="Ayakta" value="standing" />
              <Picker.Item label="Hasar Gördü" value="damaged" />
              <Picker.Item label="Yıkıldı" value="collapsed" />
            </Picker>
          </View>

          <View style={[styles.pickerContainer, styles.halfInput]}>
            <Text style={styles.pickerLabel}>
              {formData.buildingType === '' ? 'Binanın Tipi' :
               formData.buildingType === 'concrete' ? 'Beton' :
               formData.buildingType === 'adobe' ? 'Kerpiç' : 'Ahşap'}
            </Text>
            <Picker
              selectedValue={formData.buildingType}
              onValueChange={(value) => setFormData({ ...formData, buildingType: value })}
              style={styles.picker}
            >
              <Picker.Item label="Binanın Tipi" value="" />
              <Picker.Item label="Beton" value="concrete" />
              <Picker.Item label="Kerpiç" value="adobe" />
              <Picker.Item label="Ahşap" value="wooden" />
            </Picker>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.pickerContainer, styles.halfInput]}>
            <Text style={styles.pickerLabel}>
              {formData.emergencyNeeds === '' ? 'Acil İhtiyaçlar' :
               formData.emergencyNeeds === 'food' ? 'Gıda' :
               formData.emergencyNeeds === 'water' ? 'Su' :
               formData.emergencyNeeds === 'heating' ? 'Isınma' : 'Barınma'}
            </Text>
            <Picker
              selectedValue={formData.emergencyNeeds}
              onValueChange={(value) => setFormData({ ...formData, emergencyNeeds: value })}
              style={styles.picker}
            >
              <Picker.Item label="Acil İhtiyaçlar" value="" />
              <Picker.Item label="Gıda" value="food" />
              <Picker.Item label="Su" value="water" />
              <Picker.Item label="Isınma" value="heating" />
              <Picker.Item label="Barınma" value="shelter" />
            </Picker>
          </View>

          <View style={[styles.pickerContainer, styles.halfInput]}>
            <Text style={styles.pickerLabel}>
              {formData.dangerousSituation === '' ? 'Tehlikeli Durum' :
               formData.dangerousSituation === 'gas_leak' ? 'Gaz Kaçağı' :
               formData.dangerousSituation === 'fire' ? 'Yangın' : 'Yok'}
            </Text>
            <Picker
              selectedValue={formData.dangerousSituation}
              onValueChange={(value) => setFormData({ ...formData, dangerousSituation: value })}
              style={styles.picker}
            >
              <Picker.Item label="Tehlikeli Durum" value="" />
              <Picker.Item label="Gaz Kaçağı" value="gas_leak" />
              <Picker.Item label="Yangın" value="fire" />
              <Picker.Item label="Yok" value="none" />
            </Picker>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Kaç Kişisiniz?"
          placeholderTextColor="#999"
          value={formData.numberOfPeople}
          onChangeText={(text) => setFormData({ ...formData, numberOfPeople: text })}
          keyboardType="numeric"
        />

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxRow}>
            <Checkbox
              value={formData.medicalNeed}
              onValueChange={(value) => setFormData({ ...formData, medicalNeed: value })}
              color={formData.medicalNeed ? '#704F38' : undefined}
            />
            <Text style={styles.checkboxLabel}>Acil tıbbi müdahele ihtiyacı olan var mı?</Text>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox
              value={formData.bleedingPatient}
              onValueChange={(value) => setFormData({ ...formData, bleedingPatient: value })}
              color={formData.bleedingPatient ? '#704F38' : undefined}
            />
            <Text style={styles.checkboxLabel}>Kanamalı hasta var mı?</Text>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox
              value={formData.unconsciousPatient}
              onValueChange={(value) => setFormData({ ...formData, unconsciousPatient: value })}
              color={formData.unconsciousPatient ? '#704F38' : undefined}
            />
            <Text style={styles.checkboxLabel}>Bilinci yerinde olmayan hasta var mı?</Text>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox
              value={formData.shockPatient}
              onValueChange={(value) => setFormData({ ...formData, shockPatient: value })}
              color={formData.shockPatient ? '#704F38' : undefined}
            />
            <Text style={styles.checkboxLabel}>Şoka girmiş kişi var mı?</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>GÖNDER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#5C3D2E',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#333',
  },
  halfInput: {
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: '#704F38',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    height: 55,
    position: 'relative',
  },
  pickerLabel: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 18,
  },
  picker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 55,
    opacity: 0.011,
  },
  checkboxContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#704F38',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
