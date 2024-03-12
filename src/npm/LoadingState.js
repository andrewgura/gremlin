import { CardBody, CardHeader, Skeleton, Card, Stack } from "@chakra-ui/react"
import { cardBreakPoints } from "./utils"

const LoadingState = () => {
    // Query returns upto 25 results so render 25 loading cards
    const sampleSize = Array(25).fill('')
    return (
        <>
            {sampleSize.map((_, index) => (
                <Card
                    key={`${index}load`}
                    width={cardBreakPoints}
                    p={5} borderRadius="md"
                    size="sm"
                >
                    <CardHeader>
                        <Skeleton height="20px" w="40%" />
                    </CardHeader>

                    <CardBody>
                        <Stack spacing='4'>
                            <Skeleton height="20px" />
                            <Skeleton height="20px" />
                            <Skeleton height="20px" w="20%" />
                        </Stack>
                    </CardBody>
                </Card>
            ))}
        </>
    )
}

export default LoadingState