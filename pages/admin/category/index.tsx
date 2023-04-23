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
import { createCategory, deleteCategory, editCategory } from '@/apiServices/categoryServices';
import { ICategory } from '@/types/index.type';
import { IdataCategory } from '@/types/productType.type';
import useCategory from '@/hooks/useCategory';
import { AddIcon, CategoryId, CategoryImage, CategoryItem, CategoryItemHeader, CategoryName, Container, FileUpload, IdWrapper, ImageWrapper, NameWrapper, PreviewImage, PreviewImageWrapper } from '@/styled/AdminCategory.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, selectCategory } from '@/features/admin/categorySlice';

const AdminCategory: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [categoryGetData, setCategoryGetData] = useState<ICategory>({
    name: '',
    image: ''
  });
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const { categoryData } = useCategory();
  const { categoryList } = useSelector(selectCategory)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories(categoryData || []))
  }, [categoryData])
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
  const onFinish = async () => {
    const categoryFormData: ICategory = {
      name: categoryGetData.name,
      image: categoryGetData.image,
    }
    console.log(categoryFormData)
    createCategoryMutation.mutate(categoryFormData)
    dispatch(getCategories(categoryData))
  };
  const handleDeleteCategory = (id: number) => {
    deleteCategoryMutation.mutate(id)
  }
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'create product failed',
    });
  };


  console.log(categoryList)
  const handleEditCategory = async (id: number) => {
    setIsEdit(true)
    const fetchCategoryData: any = await editCategory(id)
    const { name, image } = fetchCategoryData?.data?.data || {}
    setCategoryGetData({
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
          <Form.Item label="Button" >
            <Button htmlType="submit">Add Category</Button>
          </Form.Item>
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
          {categoryList?.map((item: IdataCategory) => (
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
                <EditOutlined onClick={() => handleEditCategory(item?.id)} />
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