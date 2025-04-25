import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError)
        if (fallback) fallback()
        else toast.error(error?.data?.message || 'Something went wrong') // Nếu không có thì hiển thị lỗi bằng toast
    })
  }, [errors])
}

const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const [mutate] = mutationHook()

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true)
    const toastId = toast.loading(toastMessage || 'Đang xử lý...')

    try {
      const res = await mutate(...args)

      if (res.data) {
        toast.update(toastId, {
          render: res.data.message || 'Thành công!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        setData(res.data)
        return { success: true, data: res.data }
      } else {
        toast.update(toastId, {
          render: res?.error?.data?.message || 'Đã xảy ra lỗi',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })
        return { success: false, error: res.error }
      }
    } catch (error) {
      console.error(error)
      toast.update(toastId, {
        render: 'Lỗi hệ thống!',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  return [executeMutation, isLoading, data]
}

export { useErrors, useAsyncMutation }
