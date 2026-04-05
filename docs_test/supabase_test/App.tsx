import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import { View, Text } from 'react-native'
import { JwtPayload } from '@supabase/supabase-js'

export default function App() {
  const [claims, setClaims] = useState<JwtPayload | null>(null)

  useEffect(() => {
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      setClaims(claims)
    })

    supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data: { claims } }) => {
        setClaims(claims)
      })
    })
  }, [])

  return (
    <View>
      <Auth />
      {claims && <Text>{claims.sub}</Text>}
    </View>
  )
}

// ********** The useEffect to grab the instruments from the test instruments database **************
// import { useEffect, useState } from 'react'
// import { StyleSheet, View, FlatList, Text } from 'react-native'
// import { supabase } from './lib/supabase'

// export default function App() {
//   const [instruments, setInstruments] = useState([])

//   useEffect(() => {
//     getInstruments()
//   }, [])

//  const getInstruments = async () => {
//     const { data } = await supabase.from('instruments').select()
//     setInstruments(data)
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={instruments}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <Text style={styles.item}>{item.name}</Text>
//         )}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 50,
//     paddingHorizontal: 16,
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// })