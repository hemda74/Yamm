import styled from 'styled-components';

const NoDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(4)};
    text-align: center;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.large};
`;

const SVGWrapper = styled.div`
    width: 200px;
    height: 200px;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Message = styled.h3`
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const SubMessage = styled.p`
    color: ${({ theme }) => theme.colors.text}99;
`;

export const NoData = () => (
    <NoDataContainer>
        <SVGWrapper>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2v-2zm0-2V7h2v7h-2z"
                    fill="currentColor"
                    opacity="0.3"
                />

            </svg>
        </SVGWrapper>
        <Message>No Data Available</Message>
        <SubMessage>There are no refund orders to display at the moment.</SubMessage>
    </NoDataContainer>
); 