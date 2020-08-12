import React from 'react'
import { useQuery } from 'react-apollo'
import getTopStakersOfPropertyQuery from './query/getTopStakersOfProperty'
import styled, { css } from 'styled-components'

interface TopStakersProps {
  propertyAdress: string
}

const ListItem = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 4fr 1fr;
`

const StakersList = styled.ol`
  list-style: none;
  padding: 12px 0 0 0 !important;

  li {
    color: black;
    border-bottom: 1px solid lightgrey;
    padding: 8px 14px;

    &:last-child {
      border-bottom: 0;
    }
  }
`

const PlaceHolderList = styled.div<{ noData?: boolean }>`
  ${({ noData }) => css`
    display: flex;
    min-height: ${noData ? '150px' : '400px'};
    justify-content: center;
    align-items: center;
  `}
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`

const Address = styled(Flex)`
  padding: 5px;
  text-overflow: ellipsis;
`

const Rank = styled.span`
  padding: 5px;
`

const Value = styled.div`
  padding: 5px;
`

const TopStakers = ({ propertyAdress }: TopStakersProps) => {
  const { data: topStakersData, loading } = useQuery(getTopStakersOfPropertyQuery, {
    variables: {
      limit: 5,
      property_address: propertyAdress
    }
  })

  const stakerItems: Array<{ account_address: string; value: number }> = topStakersData?.property_lockup

  return (
    <Flex>
      <h2>Top stakers</h2>
      {loading && (
        <PlaceHolderList>
          <div>loading...</div>
        </PlaceHolderList>
      )}

      {!loading && stakerItems.length === 0 && (
        <PlaceHolderList noData>
          <div>No data available...</div>
        </PlaceHolderList>
      )}

      <StakersList>
        {stakerItems?.map(({ account_address, value }, index) => (
          <li key={`${account_address}-${value}`}>
            <ListItem>
              <Rank>{index + 1}</Rank>
              <Address>
                <h3>Account address</h3>
                <span> {`${account_address}`}</span>
              </Address>
              <Value>
                <h3>Value</h3>
                <span>{`${(value / Math.pow(10, 18)).toFixed(2)}`}</span>
              </Value>
            </ListItem>
          </li>
        ))}
      </StakersList>
    </Flex>
  )
}

export default TopStakers
