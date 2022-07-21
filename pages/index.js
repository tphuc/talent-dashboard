import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import DashboardLayout from 'layouts/DashboardLayout'

import { H2 } from 'components/Text'


export default function Home() {
  const router = useRouter();

  
  let { data,  status, } = useSession({
    required: true
});

if(status == 'loading'){
  return <div style={{width:"100vw", position:"fixed", top:0, left:0, height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
    <H2>Insource Talent</H2>
  </div>
}

  
  return (
    <DashboardLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div style={{padding:"20px"}}>
        {/* <p>Signed in as {JSON.stringify(data)} </p> */}
      
        </div>
        

     
    </DashboardLayout>
  )
}


// Home.getLayout = (page) => {
//   return <DashboardLayout>
//       {page}
//   </DashboardLayout>
// }