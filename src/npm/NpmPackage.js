import { Card, CardHeader, CardBody, Link, Text, Box, Stack, StackDivider, Tag } from '@chakra-ui/react'
import { cardBreakPoints } from './utils'

const NpmPackage = ({ data }) => {
    const keywords = data?.package?.keywords ?? []
    const hasKeywords = Boolean(keywords.length)
    const name = data.package.name

    return (
        <Card
            key={`package_${name}`}
            width={cardBreakPoints}
            p={5} borderRadius="md"
            size="sm"
        >
            <CardHeader>
                <Link size='md' href={data.package.links.npm} isExternal fontSize="2xl" color="cadetblue">
                    {name}
                </Link>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Text pt='2' fontSize='sm' mb="10px">
                            {data.package.description}
                        </Text>
                        {hasKeywords && keywords.map((i, index) => <Tag mr="4px" mb="4px" key={`tag_${i}_${index}`}>{i}</Tag>)}
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default NpmPackage