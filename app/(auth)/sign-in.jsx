import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import FormField from '../../components/FormField'
import CustomButton  from '../../components/CustomButton';
import { signIn } from '../../lib/appwrite';
import { images } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIsSubmitting(true);
    try {
      const user = await signIn(form.email, form.password);
      setUser(user);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      isSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>

        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>

          <Text className='text-2xl text-white mt-10 font-semibold'>Log in to Aora</Text>
          
          <FormField 
            title='Email'
            otherStyles='mt-10'
            value={form.email}
            keyboardType='email-address'
            handleChangeText={(e) => setForm({ ...form, email: e })}
          /> 

          <FormField 
            title='Password'
            otherStyles='mt-7'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          /> 

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-16"
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-gray-100 text-lg font-pregular'>
              Don't have account?
            </Text>
            <Link href="/sign-up" className='text-secondary-100 text-lg font-psemibold'>Sign Up</Link>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn