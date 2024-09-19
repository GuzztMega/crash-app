import React, { useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton  from '../../components/CustomButton';
import { Link } from 'expo-router'

const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>

        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>

          <Text className='text-2xl text-white mt-10 font-semibold'>Sign Up to Aora</Text>
          
          <FormField 
            title='Username'
            otherStyles='mt-10'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
          /> 

          <FormField 
            title='Email'
            otherStyles='mt-7'
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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-16"
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-gray-100 text-lg font-pregular'>
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-secondary-100 text-lg font-psemibold'>Sign In</Link>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp