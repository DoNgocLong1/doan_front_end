
import { AdminContainer, AdminSection, Button, SectionInner } from '@/styled/Admin.styled'
import Link from 'next/link'
import React from 'react'

const Admin = () => {

  return (
    <AdminContainer>

      <AdminSection>

        <Link href="/admin/category">
          <SectionInner>
            <Button>Go to ...</Button>
          </SectionInner>
        </Link>
      </AdminSection>
      <AdminSection>
        <Link href="/admin/product">

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
      <AdminSection>
        <Link href="/admin/category">

        </Link>
      </AdminSection>

    </AdminContainer>
  )
}

export default Admin
