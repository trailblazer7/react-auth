import AuthForm from "@components/AuthForm";

export default function Home() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col px-6 py-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-[28px] font-bold leading-9 tracking-tight text-gray-regular">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <AuthForm />
        </div>
      </div>
    </>
  )
}

