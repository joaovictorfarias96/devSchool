import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Box, VStack, Heading, Input, InputField, Button, ButtonText,
  FormControl, FormControlLabel, FormControlLabelText,
  Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal,
  SelectBackdrop, SelectContent, SelectDragIndicatorWrapper,
  SelectDragIndicator, SelectItem, Icon, ChevronDownIcon
} from '@gluestack-ui/themed';
import { useSchoolStore } from '../../src/features/schools/store/useSchoolStore';

export default function ManageClassScreen() {
  const router = useRouter();
  const { schoolId } = useLocalSearchParams();
  const addClass = useSchoolStore((state) => state.addClass);

  const [formData, setFormData] = useState({
    name: '',
    shift: '',
    year: '2026'
  });

  const handleSave = () => {
    if (!formData.name || !formData.shift || !schoolId) return;

    addClass({
      id: Math.random().toString(36).substring(7),
      schoolId: String(schoolId),
      name: formData.name,
      shift: formData.shift,
      year: Number(formData.year)
    });
    router.back();
  };

  return (
    <Box style={{ flex: 1, backgroundColor: '#0a0a0a', padding: 16 }}>
      <VStack space="xl" style={{ marginTop: 20 }}>
        <Heading color="$white">Nova Turma</Heading>

        <FormControl isRequired>
          <FormControlLabel><FormControlLabelText color="$textDark400">Nome da Turma</FormControlLabelText></FormControlLabel>
          <Input style={{ backgroundColor: '#171717' }}>
            <InputField color="$white" placeholder="Ex: 2º Ano C" value={formData.name} onChangeText={(v) => setFormData({ ...formData, name: v })} />
          </Input>
        </FormControl>

        {/* Seleção de Turno Conforme Solicitado */}
        <FormControl isRequired>
          <FormControlLabel>
            <FormControlLabelText color="$textDark400">Turno</FormControlLabelText>
          </FormControlLabel>

          <Select
            onValueChange={(v) => setFormData({ ...formData, shift: v })}
            selectedValue={formData.shift}
          >
            <SelectTrigger style={{ backgroundColor: '#171717', borderColor: '#333' }}>
              <SelectInput placeholder="Selecione o turno" color="$white" />
              <SelectIcon mr="$3" as={ChevronDownIcon} />
            </SelectTrigger>

            <SelectPortal>
              <SelectBackdrop />
              <SelectContent style={{ backgroundColor: '#171717' }}>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Matutino" value="Matutino" />
                <SelectItem label="Vespertino" value="Vespertino" />
                <SelectItem label="Noturno" value="Noturno" />
                <SelectItem label="Integral" value="Integral" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormControlLabel><FormControlLabelText color="$textDark400">Ano Letivo</FormControlLabelText></FormControlLabel>
          <Input style={{ backgroundColor: '#171717' }}>
            <InputField color="$white" keyboardType="numeric" value={formData.year} onChangeText={(v) => setFormData({ ...formData, year: v })} />
          </Input>
        </FormControl>

        <Button onPress={handleSave} style={{ backgroundColor: '#0077e6' }}>
          <ButtonText>Cadastrar Turma</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}