import { Text, ActivityIndicator, Button, RefreshControl } from "react-native";
import * as React from "react";
import { View } from "../../components/common/View";
import { useGrocerylistsData } from "../../hooks/grocerylistHooks";
import { FlatList, ScrollView } from "native-base";
import ListItem from "../../components/common/ListItem";

function Grocerylists({ navigation }: { navigation: any }) {
	const { data, isLoading, refetch, isRefetching } = useGrocerylistsData();
	if (!data && isLoading) return <ActivityIndicator size={30} />;

	return (
		<ScrollView
			mt={2}
			refreshControl={
				<RefreshControl
					refreshing={isRefetching}
					onRefresh={() => {
						refetch();
					}}
				/>
			}
		>
			{isLoading && <ActivityIndicator size={30} />}

			<FlatList
				data={data}
				renderItem={({ item }: any) => (
					<ListItem
						onPress={() => {
							navigation.push("GrocerylistDetail", {
								grocerylistId: item.id,
							});
						}}
						label={`${item?.menu?.name}`}
						key={`groverylist-${item.menu?.name}`}
					/>
				)}
				mb={10}
			/>
		</ScrollView>
	);
}

export default Grocerylists;
