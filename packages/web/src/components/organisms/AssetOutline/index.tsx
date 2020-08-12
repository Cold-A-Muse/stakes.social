import React, { useMemo } from 'react'
import { List, Button } from 'antd'
import { CircleGraph } from 'src/components/atoms/CircleGraph'
import { useStakingShare } from 'src/fixtures/dev-kit/hooks'
import { useGetPropertyAuthenticationQuery } from '@dev/graphql'
import styled from 'styled-components'
import Link from 'next/link'
// import useFetch from 'src/hooks/useFetch'

interface Props {
  className?: string
  propertyAddress: string
}

const Wrap = styled.div`
  display: grid;
`
const OutlinesWrap = styled(Wrap)`
  grid-gap: 1.5rem;
  align-content: baseline;
`
const AssetStrengthWrap = styled(Wrap)`
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 1rem;
  grid-auto-columns: 0.5fr auto;
`
const AssetStrengthValue = styled.span`
  font-size: 2rem;
  color: black;
`
const AssetListItem = styled(List.Item)`
  font-size: 1.3rem;
`

const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const KarmaBadge = styled.div`
  padding: 5px;
  margin-right: 5px;
  border-radius: 9px;
  box-shadow: 0 4px 3px -3px black;
  border: 1px solid lightgray;
`

const Account = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const AssetStrengthBase = ({ assetStrength }: { assetStrength: number }) => (
  <AssetStrengthWrap>
    <CircleGraph percentage={assetStrength} />
    <div>
      <AssetStrengthValue>{Math.round(assetStrength * 100)}%</AssetStrengthValue>
    </div>
  </AssetStrengthWrap>
)

const AssetStrength = ({ property }: { property: string }) => {
  const { stakingShare: maybeAssetStrength } = useStakingShare(property)
  const assetStrength = useMemo(() => maybeAssetStrength || 0, [maybeAssetStrength])
  return <AssetStrengthBase assetStrength={assetStrength} />
}

const Author = ({ propertyAddress }: { propertyAddress: string }) => {
  // const BASELINE_URL = 'https://api.devprtcl.com/v1/karma/'
  // const fetchUrl = `${BASELINE_URL}${propertyAddress}`
  // const { data, isLoading, hasError, errorMessage } = useFetch(fetchUrl)

  return (
    <AuthorContainer>
      <div>Author</div>
      <Account>
        <h2>Daan</h2>
        <KarmaBadge>26,401</KarmaBadge>
      </Account>

      <div>{propertyAddress}</div>
    </AuthorContainer>
  )
}

export const AssetOutline = ({ className, propertyAddress }: Props) => {
  const { data } = useGetPropertyAuthenticationQuery({ variables: { propertyAddress } })
  /* eslint-disable react-hooks/exhaustive-deps */
  // FYI: https://github.com/facebook/react/pull/19062
  const includedAssetList = useMemo(() => data?.property_authentication.map(e => e.authentication_id), [data])

  return (
    <OutlinesWrap className={className}>
      <div>
        <p>Included Assets</p>
        <List
          style={{ background: '#fff' }}
          bordered
          dataSource={includedAssetList}
          renderItem={item => (
            <AssetListItem>
              <span style={{ overflow: 'auto' }}>{item}</span>
            </AssetListItem>
          )}
        />
        <Link href={'/auth/[property]'} as={`/auth/${propertyAddress}`}>
          <Button type="dashed" size="small" style={{ marginTop: '0.5rem' }}>
            Add your asset
          </Button>
        </Link>
      </div>
      <Author propertyAddress={propertyAddress} />
      <div>
        <p>Staking Ratio</p>
        <AssetStrength property={propertyAddress} />
      </div>
    </OutlinesWrap>
  )
}
