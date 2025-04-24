import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError)
        if (fallback) fallback()
        else toast.error(error?.data?.message || 'Something went wrong')
    })
  }, [errors])
}

const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const [mutate] = mutationHook()

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true)
    const toastId = toast.loading(toastMessage || 'Updating data...')

    try {
      const result = await mutate(...args)

      if (result.data) {
        toast.update(toastId, {
          render: result.data.message || 'Update data successfully',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })

        setData(result.data)
        return result.data
      } else if (result.error) {
        toast.update(toastId, {
          render: result.error.data?.message || 'Something went wrong',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })

        throw result.error
      }
    } catch (error) {
      console.log('Error in useAsyncMutation:', error)

      toast.update(toastId, {
        render: 'Something went wrong',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return [executeMutation, isLoading, data]
}

export { useErrors, useAsyncMutation }
