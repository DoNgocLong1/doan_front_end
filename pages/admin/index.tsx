
import { getUser } from '@/apiServices/userServices'
import { getCookie } from '@/helper'
import { AdminContainer, AdminImg, AdminSection, Button, SectionInner } from '@/styled/Admin.styled'
import Link from 'next/link'
import React from 'react'

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
const Admin = () => {

  return (
    <AdminContainer>
      <AdminSection>
        <Link href="/admin/category">
          <SectionInner>
            <AdminImg src="/admin2.webp" />
            <Button>Category administrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/product">
          <SectionInner>
            <AdminImg src="/admin1.webp" />
            <Button>Product administrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/user">
          <SectionInner>
            <AdminImg src="/admin3.webp" />
            <Button>User aministrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/product/product-images">
          <SectionInner>
            <AdminImg src="/admin4.webp" />
            <Button>Product Image administrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/user">
          <SectionInner>
            <AdminImg src="/admin5.webp" />
            <Button>User administrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>

    </AdminContainer>
  )
}

export default Admin
