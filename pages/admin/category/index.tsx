import React, { ChangeEvent, useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
} from 'antd';
import { message } from 'antd';

import { FeatureWrapper, OptionContainer } from '@/styled/Admin.styled';
import { createProduct } from '@/apiServices/productService';
import { useMutation } from 'react-query';
import { createCategory, deleteCategory, getCategory, fetchCategory, updateCategory } from '@/apiServices/categoryServices';
import { ICategory } from '@/types/index.type';
import { IdataCategory } from '@/types/productType.type';
import useCategory from '@/hooks/useCategory';
import { AddIcon, CategoryId, CategoryImage, CategoryItem, CategoryItemHeader, CategoryName, Container, FileUpload, IdWrapper, ImageWrapper, NameWrapper, PreviewImage, PreviewImageWrapper } from '@/styled/AdminCategory.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, selectCategory } from '@/features/admin/categorySlice';
import { getCookie } from '@/helper';
import { getUser } from '@/apiServices/userServices';

export const getServerSideProps = async (contexts: any) => {
  const tokenType = contexts.req.headers.cookie
  const token = getCookie('token', tokenType)
  const fetchUser = await getUser(token);
  const role = fetchUser?.data?.roleId || 2;
  if (role === 2) {
    return {
      notFound: true
    }
  }
  return {
    props: {
    }
  }
}
const AdminCategory: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [categoryGetData, setCategoryGetData] = useState<IdataCategory>({
    id: 0,
    name: '',
    image: ''
  });
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const createCategoryMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'create category success',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'create category failed',
      });
    },
    mutationFn: (categoryData: ICategory) => createCategory(categoryData)
  })
  const deleteCategoryMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'delete category success',
      });
    },

    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'delete category failed',
      });
    },
    mutationFn: (id: number) => deleteCategory(id)
  })

  const updateCategoryMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'update category success',
      });
    },

    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'update category failed',
      });
    },
    mutationFn: (formData: IdataCategory) => updateCategory(formData)
  })
  const [categoryData, setCategoryData] = useState<IdataCategory[]>([])
  const fetchCategoryData = async () => {
    const categoryData: any = await fetchCategory()
    setCategoryData(categoryData?.data?.data || [])
  }
  useEffect(() => {
    fetchCategoryData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onFinish = async () => {
    const categoryFormData: ICategory = {
      name: categoryGetData.name,
      image: categoryGetData.image,
    }
    createCategoryMutation.mutate(categoryFormData)
    setTimeout(() => {
      fetchCategoryData()
    }, 1000)
  };
  const handleDeleteCategory = (id: number) => {
    deleteCategoryMutation.mutate(id)
    setTimeout(() => {
      fetchCategoryData()
    }, 1000)
  }
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'create product failed',
    });
  };

  const handleEditCategory = () => {
    updateCategoryMutation.mutate(categoryGetData)
    setTimeout(() => {
      fetchCategoryData()
    }, 1000)
  }
  const handleSelectCategory = async (id: number) => {
    setIsEdit(true)
    const fetchCategoryData: any = await getCategory(id)
    const { name, image } = fetchCategoryData?.data?.data || {};
    setCategoryGetData({
      id,
      name,
      image
    })
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const file = e?.target?.files?.[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setCategoryGetData(categoryGetData => ({ ...categoryGetData, [e.target.name]: reader.result as string }));
      }
      reader.readAsDataURL(file)
    } else {
      setCategoryGetData(categoryGetData => ({ ...categoryGetData, [e.target.name]: e.target.value }));
    }

  };
  return (
    <>
      <OptionContainer>
        {contextHolder}
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Name">
            <Input placeholder='Category name' name="name" value={categoryGetData.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Upload">
            <FileUpload
              type="file"
              id="file"
              name="image"
              onChange={handleChange}

            />
            <PreviewImageWrapper>
              <AddIcon htmlFor="file">
                {categoryGetData.image ?
                  <PreviewImage
                    src={categoryGetData.image}
                    alt="preview"
                    title="preview"
                    width="100"
                    height="100"
                  /> : "+"}

              </AddIcon>
            </PreviewImageWrapper>
          </Form.Item>
          {isEdit ? (
            <Form.Item label="Button" >
              <Button onClick={handleEditCategory}>Update Category</Button>
            </Form.Item>
          ) : (
            <Form.Item label="Button" >
              <Button htmlType="submit">Add Category</Button>
            </Form.Item>
          )}

        </Form>
        <Container>
          <CategoryItemHeader>
            <IdWrapper>
              <CategoryId>ID</CategoryId>
            </IdWrapper>
            <NameWrapper>
              <CategoryName>
                Name
              </CategoryName>
            </NameWrapper>
            <ImageWrapper>
              <CategoryName>
                Image
              </CategoryName>
            </ImageWrapper>
            <IdWrapper>
              <CategoryId>
                Feature
              </CategoryId>
            </IdWrapper>
          </CategoryItemHeader>
          {categoryData?.map((item: IdataCategory) => (
            <CategoryItem key={item?.id}>
              <IdWrapper>
                <CategoryId>{item?.id}</CategoryId>
              </IdWrapper>
              <NameWrapper>
                <CategoryName>
                  {item.name}
                </CategoryName>
              </NameWrapper>
              <ImageWrapper>
                <CategoryImage src={item?.image} />
              </ImageWrapper>
              <FeatureWrapper>
                <EditOutlined onClick={() => handleSelectCategory(item?.id)} />
                <DeleteOutlined onClick={() => handleDeleteCategory(item?.id)} />
              </FeatureWrapper>
            </CategoryItem>
          ))}
        </Container>
      </OptionContainer>
    </>
  );
};

export default AdminCategory
