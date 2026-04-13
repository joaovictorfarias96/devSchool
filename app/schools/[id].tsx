import React from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Box, VStack, Heading, Text, FlatList, Button, ButtonText, HStack, Icon, ArrowLeftIcon, TrashIcon, EditIcon, AddIcon, Pressable } from '@gluestack-ui/themed';
import { useSchoolStore } from '../../src/features/schools/store/useSchoolStore';
import { Alert } from 'react-native';

export default function SchoolDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { schools, classes, deleteSchool, deleteClass } = useSchoolStore() as any;

  const school = schools.find((s: any) => s.id === id);
  const schoolClasses = classes.filter((c: any) => c.schoolId === id);

  if (!school) return null;

  return (
    <Box style={{ flex: 1, backgroundColor: '#0a0a0a', padding: 16 }}>
      <Stack.Screen options={{ title: school.name }} />
      <VStack style={{ marginTop: 20 }}>
        <HStack style={{ justifyContent: 'space-between', marginBottom: 20 }}>
          <Pressable onPress={() => router.replace('/')}><Icon as={ArrowLeftIcon} color="$white" /></Pressable>
          <HStack space="md">
            <Button size="sm" onPress={() => router.push(`/schools/manage?id=${id}`)} style={{ backgroundColor: '#262626' }}><Icon as={EditIcon} color="$white" /></Button>
            <Button size="sm" onPress={() => { deleteSchool(id); router.replace('/'); }} style={{ backgroundColor: '#450a0a' }}><Icon as={TrashIcon} color="$red500" /></Button>
          </HStack>
        </HStack>

        <Heading color="$white" size="xl">{school.name}</Heading>
        <Text color="$textDark400" mb="$8">{school.address}</Text>

        <HStack style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Heading color="$white" size="md">Turmas</Heading>
          <Button size="sm" onPress={() => router.push({ pathname: '/classes/manage', params: { schoolId: id } })} style={{ backgroundColor: '#0077e6' }}>
            <Icon as={AddIcon} color="$white" mr="$1" />
            <ButtonText>Nova Turma</ButtonText>
          </Button>
        </HStack>

        <FlatList
          data={schoolClasses}
          renderItem={({ item }: any) => (
            <HStack style={{ padding: 16, backgroundColor: '#171717', borderRadius: 8, marginBottom: 8, justifyContent: 'space-between' }}>
              <VStack>
                <Text color="$white" bold>{item.name}</Text>
                <Text color="$textDark400" size="sm">{item.shift} • {item.year}</Text>
              </VStack>
              <Pressable onPress={() => deleteClass(item.id)}><Icon as={TrashIcon} color="$textDark500" /></Pressable>
            </HStack>
          )}
        />
      </VStack>
    </Box>
  );
}