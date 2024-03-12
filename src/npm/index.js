import { Input, Flex, Radio, RadioGroup, Stack, useToast  } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { errorToasterSettings } from './utils'
import { Button } from '@chakra-ui/react'
import NpmPackage from './NpmPackage'
import LoadingState from './LoadingState'
import ViewStates from './types'

const PackageFinder = () => {
  const toast = useToast()
  const [queryString, setQueryString] = useState('')
  const [testState, setTestState] = useState(ViewStates.DEFAULT)
  const [npmResults, setNpmResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  // Only for radio button click to manually see popup message for extra credit
  // Plus wanted an excuse to show a useEffect
  useEffect(() => {
    if(testState === ViewStates.ERROR) {
      toast({
        ...errorToasterSettings,
        description: "Testing error popup message.",
      })
    }
    // Only care about testState changing to run effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testState])

  const fetchNpmResults = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.npms.io/v2/search/suggestions?q=${queryString}`);
      const result = await response.json();
      
      if(testState === ViewStates.ERROR) {
        throw new Error('Simulation of network error')
      }

      if(result.length === 0) {
        toast({
          description: "No packages were found with the input string.",
          ...errorToasterSettings,
        })
        setError(true) //Only set error true here for input styling
      } else {
        setNpmResults(result);
      }

    } catch (error) {
      toast({
        description: error.message,
        ...errorToasterSettings,
      })
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = e => {
    // Only place needed to set error state
    setError(null)
    setQueryString(e.target.value)
  }

  return (
    <div>
      <RadioGroup onChange={setTestState} value={testState}>
        <Stack direction='column' m="25px" display="inline-flex">
          <Radio value={ViewStates.DEFAULT}>Default State</Radio>
          <Radio value={ViewStates.ERROR}>Show Error State</Radio>
          <Radio value={ViewStates.LOADING}>Show Loading State</Radio>
        </Stack>
      </RadioGroup>

      <form onSubmit={fetchNpmResults}>
        <Flex align="center" gap="2" m="10px">
          <Input w="600px" placeholder='Search for NPM packages' value={queryString} onChange={e => handleInputChange(e)} isInvalid={error} errorBorderColor="crimson" />
          <Button colorScheme='blue' type='submit'>Search</Button>
        </Flex>
      </form>

      <Flex wrap="wrap" gap={4} m="10px">
        {(isLoading || testState === ViewStates.LOADING) && <LoadingState />}
        {(Boolean(npmResults.length) && testState === ViewStates.DEFAULT) && npmResults.map(i => <NpmPackage data={i} key={`render_${i.package.name}`} />)}
      </Flex>
    </div>
  );
}

export default PackageFinder;
