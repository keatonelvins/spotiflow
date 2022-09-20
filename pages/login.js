import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
    <div className="flex flex-color items-center bg-[#003c8f] min-h-screen w-full justify-center">
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className='bg-[#ECF0F1] hover:bg-[#BDC3C7] text-[#0277bd] font-bold p-5 rounded-full'
            onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
              Login With {provider.name}
            </button>
          </div>
        ))}
    </div>
  )
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}