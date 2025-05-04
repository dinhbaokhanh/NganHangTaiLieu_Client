import React, { useState, useEffect } from 'react'
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import SubjectForm from '../../components/admin/SubjectForm'
import { universityMajors } from '../../constants/category'

import {
  useGetAllSubjectsQuery,
  useCreateSubjectMutation,
  useUpdateSubjectByIdMutation,
  useDeleteSubjectByIdMutation,
} from '../../redux/api/api.js'
import { useAsyncMutation, useErrors } from '../../hooks/hook.js'
import { toast } from 'react-toastify'

const Subjects = () => {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [selectedMajor, setSelectedMajor] = useState('')

  const {
    data: subjectsData,
    isLoading,
    error,
    refetch,
  } = useGetAllSubjectsQuery()

  const [createSubject, isCreating] = useAsyncMutation(useCreateSubjectMutation)
  const [updateSubject, isUpdating] = useAsyncMutation(
    useUpdateSubjectByIdMutation
  )
  const [deleteSubject, isDeleting] = useAsyncMutation(
    useDeleteSubjectByIdMutation
  )

  useErrors([{ isError: !!error, error }])

  const subjects = subjectsData?.subjects || []

  const filteredSubjects = subjects.filter((subject) => {
    const matchesName = subject.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
    const matchesMajor = selectedMajor ? subject.major === selectedMajor : true
    return matchesName && matchesMajor
  })

  const handleAddSubject = () => {
    setEditingSubject(null)
    setIsModalOpen(true)
  }

  const handleEditSubject = (subject) => {
    console.log(subject)

    setEditingSubject(subject)
    setIsModalOpen(true)
  }

  const handleDeleteSubject = async (subjectToDelete) => {
    toast.info('Bạn đang xoá môn học...')

    const confirm = await toast.promise(
      new Promise((resolve, reject) => {
        const confirmed = window.confirm(
          'Bạn có chắc chắn muốn xoá môn học này?'
        )
        if (confirmed) {
          resolve(true)
        } else {
          reject(false)
        }
      }),
      {
        pending: 'Đang xử lý...',
        success: 'Môn học đã được xoá!',
        error: 'Đã có lỗi xảy ra khi xoá môn học!',
      }
    )

    if (confirm) {
      await deleteSubject('Đang xoá môn học...', subjectToDelete._id)
      await refetch()
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleSubjectSubmit = async (subjectData) => {
    if (editingSubject) {
      await updateSubject('Đang cập nhật môn học...', {
        id: editingSubject._id,
        ...subjectData,
      })
    } else {
      await createSubject('Đang thêm môn học...', subjectData)
    }
    await refetch()
    setIsModalOpen(false)
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSubjects = filteredSubjects.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="p-6 bg-gray-100 h-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Danh sách môn học</h2>
          <button
            onClick={handleAddSubject}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-600 border border-red-600 transition"
          >
            <FaPlus />
            Thêm môn học
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6 max-h-10">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md"
          />

          <select
            className="px-4 py-2 border rounded-md"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
          >
            <option value="">Chọn ngành</option>
            {universityMajors.map((major) => (
              <option key={major.value} value={major.value}>
                {major.label}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-8">Đang tải dữ liệu...</div>
        ) : (
          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Tên môn học
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Mã môn học
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Chuyên ngành
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedSubjects.map((subject) => (
                <tr key={subject._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.code}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.major}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleEditSubject(subject)}
                      className="text-gray-600 cursor-pointer hover:text-blue-600 mr-4"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteSubject(subject)}
                      className="text-gray-600 cursor-pointer hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          {/* Nút Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex cursor-pointer items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition
                    ${
                      currentPage === 1
                        ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
                    }
                  `}
          >
            <FaChevronLeft />
            Trước
          </button>

          {/* Các nút số trang */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 cursor-pointer py-2 rounded-md transition
                        ${
                          currentPage === page
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
                        }
                      `}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Nút Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex cursor-pointer items-center justify-center gap-2 w-24 px-4 py-2 rounded-md transition
                    ${
                      currentPage === totalPages
                        ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-600 hover:bg-red-600 hover:text-white'
                    }
                  `}
          >
            Sau
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Subject Form Modal */}
      {isModalOpen && (
        <SubjectForm
          initialData={editingSubject}
          mode={editingSubject ? 'edit' : 'add'}
          onSubmit={handleSubjectSubmit}
          onClose={handleModalClose}
          isLoading={isCreating || isUpdating}
        />
      )}
    </div>
  )
}

export default Subjects
