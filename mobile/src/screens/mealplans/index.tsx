import { ActivityIndicator, Button, TouchableOpacity } from "react-native";
import * as React from "react";
import { useMenusData } from "../../hooks/menusHooks";
import { View } from "../../components/common";
import { ChevronRightIcon, FlatList, Stack, Text } from "native-base";
import ListItem from "../../components/common/ListItem";

function Mealplans({ navigation }: { navigation: any }): JSX.Element {
	const { data, isLoading } = useMenusData();

	console.log(data);
	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<View className="grid gap-1 mt-1">
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				data={data}
				renderItem={({ item }: any) => (
					<TouchableOpacity onPress={() => {}}>
						<Stack
							direction="row"
							key={`mealplan-${item.id}`}
							height="20"
							bgColor="white"
							borderRadius={10}
							p={2}
							px={6}
							shadow="2"
							my={1}
							mx={2}
							justifyContent={"space-between"}
							alignItems={"center"}
						>
							<Stack>
								<Text fontSize="xl">{item.name}</Text>
								<Text fontSize="sm">
									{`${item?.meals?.length} meal${
										item?.meals?.length > 1 ? "s" : ""
									}`}
								</Text>
							</Stack>
							<ChevronRightIcon />
						</Stack>
					</TouchableOpacity>
				)}
				mb={10}
			/>
		</View>
	);
}

export default Mealplans;
