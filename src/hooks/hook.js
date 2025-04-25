import { useState } from 'react'
import { toast } from 'react-toastify'

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError)
        if (fallback) fallback() // Nếu có hàm fallback thì gọi fallback
        else toast.error(error?.data?.message || 'Something went wrong') // Nếu không có thì hiển thị lỗi bằng toast
    })
  }, [errors]) // Chạy lại khi mảng errors thay đổi
}

const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false) // Trạng thái loading của mutation
  const [data, setData] = useState(null) // Dữ liệu trả về từ mutation

  const [mutate] = mutationHook() // Lấy hàm mutate từ mutation hook

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true)
    const toastId = toast.loading(toastMessage || 'Updating data...') // Hiển thị toast đang xử lý

    try {
      const result = await mutate(...args) // Gọi mutation

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
        // Nếu mutation trả về lỗi
        toast.update(toastId, {
          render: result.error.data?.message || 'Something went wrong',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })

        throw result.error
      }
    } catch (error) {
      // Nếu có lỗi bất ngờ xảy ra
      console.log('Error in useAsyncMutation:', error)

      toast.update(toastId, {
        render: 'Something went wrong',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })

      throw error
    } finally {
      setIsLoading(false) // Kết thúc loading
    }
  }

  // Trả về hàm thực thi mutation, trạng thái loading và dữ liệu trả về
  return [executeMutation, isLoading, data]
}

export { useErrors, useAsyncMutation }
