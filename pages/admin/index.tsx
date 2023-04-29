
import { AdminContainer, AdminSection, Button, SectionInner } from '@/styled/Admin.styled'
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
            <Button>Category administrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/product">
          <SectionInner>
            <Button>Product administrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/user">
          <SectionInner>
            <Button>User dministrator</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/category">

        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/category">

        </Link>
      </AdminSection>

    </AdminContainer>
  )
}

export default Admin
