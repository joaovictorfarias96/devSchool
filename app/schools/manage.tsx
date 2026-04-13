import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Box, VStack, Heading, Input, InputField, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText } from '@gluestack-ui/themed';
import { useSchoolStore } from '../../src/features/schools/store/useSchoolStore';

export default function ManageSchoolScreen() {
  const router = useRouter();
  const addSchool = useSchoolStore((state) => state.addSchool);
  const [formData, setFormData] = useState({ name: '', address: '' });

  const handleSave = () => {
    if (!formData.name || !formData.address) return;
    addSchool({
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      address: formData.address
    });
    router.replace('/'); // Volta para a lista principal
  };

  return (
    <Box style={{ flex: 1, backgroundColor: '#0a0a0a', padding: 16 }}>
      <VStack space="xl" style={{ marginTop: 20 }}>
        <Heading color="$white">Cadastrar Escola</Heading>
        <FormControl>
          <FormControlLabel><FormControlLabelText color="$textDark400">Nome da Unidade</FormControlLabelText></FormControlLabel>
          <Input style={{ backgroundColor: '#171717', borderColor: '#333' }}>
            <InputField color="$white" value={formData.name} onChangeText={(v) => setFormData({...formData, name: v})} />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel><FormControlLabelText color="$textDark400">Endereço</FormControlLabelText></FormControlLabel>
          <Input style={{ backgroundColor: '#171717', borderColor: '#333' }}>
            <InputField color="$white" value={formData.address} onChangeText={(v) => setFormData({...formData, address: v})} />
          </Input>
        </FormControl>
        <Button onPress={handleSave} style={{ backgroundColor: '#0077e6' }}>
          <ButtonText>Salvar Escola</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}