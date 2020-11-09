import React from 'react'
import { useRouter } from 'next/router'
import { InvitationRequestForm } from 'src/components/organisms/InvitationRequestForm'
import { Footer } from 'src/components/organisms/Footer'
import { Header } from 'src/components/organisms/Header'
import { Headline } from 'src/components/atoms/Headline'
import { H2 } from 'src/components/atoms/Typography'
import styled from 'styled-components'
import { EarlyAccess } from 'src/components/atoms/EarlyAccess'

type Props = {}

const WrapContainer = styled.div`
  max-width: 760px;
  margin: auto;
  padding-top: 1rem;
  word-break: break-all;
`

const InvitationRequest = (_: Props) => {
  const { market } = useRouter().query as { market: string }

  return (
    <>
      <Header />
      <EarlyAccess />
      <Headline height={300}>
        <H2>Creator Waitlist</H2>
        <p style={{ textAlign: 'center' }}>
          Dev Protocol is now accepting applications to onboard your Github OSS project.
        </p>
      </Headline>
      <WrapContainer>
        <InvitationRequestForm market={market} />
      </WrapContainer>
      <Footer />
    </>
  )
}

export default InvitationRequest
