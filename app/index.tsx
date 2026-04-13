import React, { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { 
  Box, FlatList, Heading, Text, VStack, HStack, Button, 
  ButtonText, Icon, AddIcon, Input, InputField, SearchIcon, Pressable 
} from '@gluestack-ui/themed';
import { useSchoolStore, School, SchoolClass } from '../src/features/schools/store/useSchoolStore';

export default function SchoolListScreen() {
  const router = useRouter();
  
  // Seletores com tipagem para evitar erro de 'unknown'
  const schools = useSchoolStore((state) => state.schools);
  const classes = useSchoolStore((state) => state.classes);
  
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = useMemo(() => {
    return schools.filter((school: School) => 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [schools, searchTerm]);

  const getClassCount = (schoolId: string) => {
    return classes.filter((c: SchoolClass) => c.schoolId === schoolId).length;
  };

  return (
    <Box style={{ flex: 1, backgroundColor: '#0a0a0a', padding: 16 }}>
      <VStack style={{ marginTop: 20 }}>
        <HStack style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <VStack>
            <Heading style={{ color: '#fff' }}>Escolas</Heading>
            <Text style={{ color: '#a3a3a3' }}>Rede Municipal</Text>
          </VStack>
          <Button onPress={() => router.push('/schools/manage')} style={{ backgroundColor: '#0077e6' }}>
            <Icon as={AddIcon} color="$white" mr="$2" />
            <ButtonText>Nova</ButtonText>
          </Button>
        </HStack>

        <Input style={{ marginBottom: 20, backgroundColor: '#171717', borderColor: '#333' }}>
          <Icon as={SearchIcon} ml="$3" color="$textDark400" />
          <InputField 
            placeholder="Buscar escola..." 
            color="$white" 
            value={searchTerm} 
            onChangeText={setSearchTerm} 
          />
        </Input>

        <FlatList
          data={filteredSchools as School[]}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => (
            <Pressable onPress={() => router.push(`/schools/${item.id}`)}>
              <Box style={{ padding: 16, backgroundColor: '#171717', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#262626' }}>
                <Heading style={{ color: '#fff', fontSize: 18 }}>{item.name}</Heading>
                <Text style={{ color: '#a3a3a3', marginBottom: 10 }}>{item.address}</Text>
                <HStack style={{ justifyContent: 'space-between' }}>
                  <Box style={{ backgroundColor: '#262626', padding: 4, borderRadius: 4 }}>
                    <Text style={{ color: '#0077e6', fontSize: 12 }}>{getClassCount(item.id)} Turmas</Text>
                  </Box>
                  <Text style={{ color: '#555', fontSize: 12 }}>Gerenciar →</Text>
                </HStack>
              </Box>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={{ color: '#555', textAlign: 'center', marginTop: 20 }}>
              Nenhuma escola encontrada.
            </Text>
          }
        />
      </VStack>
    </Box>
  );
}