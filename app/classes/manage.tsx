import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Box, VStack, Heading, Input, InputField, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText } from '@gluestack-ui/themed';
import { useSchoolStore } from '../../src/features/schools/store/useSchoolStore';

export default function ManageClassScreen() {
  const router = useRouter();
  const { schoolId } = useLocalSearchParams();
  const addClass = useSchoolStore((state) => state.addClass);
  const [formData, setFormData] = useState({ name: '', year: '2026' });

  const handleSave = () => {
    if (!formData.name || !schoolId) return;
    addClass({
      id: Math.random().toString(36).substring(7),
      schoolId: String(schoolId),
      name: formData.name,
      shift: 'Matutino',
      year: Number(formData.year)
    });
    router.replace(`/schools/${schoolId}`); // Volta para os detalhes da escola
  };

  return (
    <Box style={{ flex: 1, backgroundColor: '#0a0a0a', padding: 16 }}>
      <VStack space="xl" style={{ marginTop: 20 }}>
        <Heading color="$white">Nova Turma</Heading>
        <FormControl>
          <FormControlLabel><FormControlLabelText color="$textDark400">Nome da Turma</FormControlLabelText></FormControlLabel>
          <Input style={{ backgroundColor: '#171717', borderColor: '#333' }}>
            <InputField color="$white" value={formData.name} onChangeText={(v) => setFormData({...formData, name: v})} />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel><FormControlLabelText color="$textDark400">Ano</FormControlLabelText></FormControlLabel>
          <Input style={{ backgroundColor: '#171717', borderColor: '#333' }}>
            <InputField color="$white" keyboardType="numeric" value={formData.year} onChangeText={(v) => setFormData({...formData, year: v})} />
          </Input>
        </FormControl>
        <Button onPress={handleSave} style={{ backgroundColor: '#0077e6' }}>
          <ButtonText>Salvar Turma</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}