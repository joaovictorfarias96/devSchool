import React, { useState } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import {
  Box, VStack, Heading, Text, FlatList, Button, ButtonText,
  HStack, Icon, ArrowLeftIcon, TrashIcon, EditIcon, AddIcon,
  Pressable, Input, InputField, CheckIcon, CloseIcon
} from '@gluestack-ui/themed';
import { useSchoolStore } from '../../src/features/schools/store/useSchoolStore';

export default function SchoolDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { schools, classes, deleteSchool, deleteClass, updateSchool } = useSchoolStore();

  const school = schools.find((s) => s.id === id);
  const schoolClasses = classes.filter((c) => c.schoolId === id);

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(school?.name || '');

  if (!school) return null;

  const handleSaveName = () => {
    updateSchool(school.id, { name: tempName });
    setIsEditing(false);
  };

  return (
    <Box style={{ flex: 1, backgroundColor: '#0a0a0a', padding: 16 }}>
      <Stack.Screen options={{ title: "Detalhes da Escola" }} />

      <VStack space="xl" style={{ marginTop: 20 }}>
        {/* Header de Navegação e Exclusão */}
        <HStack justifyContent="space-between" alignItems="center">
          <Pressable onPress={() => router.replace('/')}>
            <Icon as={ArrowLeftIcon} color="$white" size="xl" />
          </Pressable>
          <Button size="sm" action="negative" onPress={() => { deleteSchool(school.id); router.replace('/'); }}>
            <Icon as={TrashIcon} color="$white" />
          </Button>
        </HStack>

        {/* Edição do Nome da Escola */}
        {isEditing ? (
          <HStack space="sm" alignItems="center">
            <Input style={{ flex: 1, backgroundColor: '#171717', borderColor: '#0077e6' }}>
              <InputField color="$white" value={tempName} onChangeText={setTempName} autoFocus />
            </Input>
            <Pressable onPress={handleSaveName}><Icon as={CheckIcon} color="$success500" size="xl" /></Pressable>
            <Pressable onPress={() => setIsEditing(false)}><Icon as={CloseIcon} color="$error500" size="xl" /></Pressable>
          </HStack>
        ) : (
          <HStack space="md" alignItems="center">
            <Heading color="$white" size="xl">{school.name}</Heading>
            <Pressable onPress={() => setIsEditing(true)}><Icon as={EditIcon} color="$primary500" /></Pressable>
          </HStack>
        )}
        <Text color="$textDark400">{school.address}</Text>

        <HStack justifyContent="space-between" alignItems="center" mt="$4">
          <Heading color="$white" size="md">Turmas</Heading>
          <Button size="sm" onPress={() => router.push({ pathname: '/classes/manage', params: { schoolId: id } })}>
            <Icon as={AddIcon} color="$white" mr="$2" />
            <ButtonText>Nova Turma</ButtonText>
          </Button>
        </HStack>

        {/* Listagem de Turmas com Turno e Ano */}
        <FlatList
          data={schoolClasses}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <HStack style={{ padding: 16, backgroundColor: '#171717', borderRadius: 12, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' }}>
              <VStack>
                <Text color="$white" fontWeight="$bold">{item.name}</Text>
                <HStack space="xs" alignItems="center">
                  <Box px="$2" py="$0.5" rounded="$sm" bg="$primary800">
                    <Text color="$white" size="xs" bold style={{ textTransform: 'uppercase' }}>
                      {item.shift}
                    </Text>
                  </Box>
                  <Text color="$textDark400" size="xs"> • {item.year}</Text>
                </HStack>
              </VStack>
              <Pressable onPress={() => deleteClass(item.id)}>
                <Icon as={TrashIcon} color="$textDark500" />
              </Pressable>
            </HStack>
          )}
        />
      </VStack>
    </Box>
  );
}