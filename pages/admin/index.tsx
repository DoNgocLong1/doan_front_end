
import { AdminContainer, AdminImg, AdminSection, Button, SectionInner } from '@/styled/Admin.styled'
import Link from 'next/link'
import React from 'react'

export const getServerSideProps = () => {
  return {
    props: {}
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
            <Button>User dministrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/user">
          <SectionInner>
            <AdminImg src="/admin4.webp" />
            <Button>User dministrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/user">
          <SectionInner>
            <AdminImg src="/admin5.webp" />
            <Button>User dministrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>

    </AdminContainer>
  )
}

export default Admin
