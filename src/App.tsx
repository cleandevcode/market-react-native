import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "./components/Card";
import { Product, ProductsShopAPI } from "./util/api";
import { colors } from "./util/constant";
import CategoryIcon from "./components/CategoryIcon";
import { Category, CategoryType } from "./util/types";

const categories = [
  {
    name: Category.ALL,
  },
  {
    name: Category.HOUSEHOLD,
  },
  {
    name: Category.CLOTHING,
  },
  {
    name: Category.GARDEN,
  },
];

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [initLoading, setInitLoading] = useState(false);
  const [selectedCategory, setSelectCategory] = useState<CategoryType>("All");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    getProducts(selectedCategory, page);
  }, [selectedCategory, page]);

  const getProducts = useCallback(
    async (category: CategoryType, page: number) => {
      const api = new ProductsShopAPI();
      try {
        if (page === 1) setInitLoading(true);
        else setFetchingMore(true);
        const data = await api.getProducts({
          category: category === `All` ? undefined : category,
          page,
        });
        if (data) {
          setProducts([...products, ...data.data]);
          setTotalPage(data.pagination.totalPages);
          setInitLoading(false);
          setFetchingMore(false);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [page, setInitLoading, setProducts, setTotalPage]
  );

  const handleChangeCategory = useCallback(
    (category: CategoryType) => {
      setProducts([]);
      setPage(1);
      setSelectCategory(category);
    },
    [setProducts, setPage, setSelectCategory]
  );

  const handlePullRefresh = useCallback(() => {
    setProducts([]);
    setPage(1);
    setSelectCategory(selectedCategory);
  }, [setProducts, setPage, setSelectCategory]);

  const fetchMore = useCallback(() => {
    if (totalPage > page && products.length > 0)
      setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 500);
  }, [totalPage, page, setPage, products]);

  const renderItem = useCallback(({ item }: any) => {
    return <Card product={item} onPress={(id) => console.log(id)} />;
  }, []);

  const renderFooter = useCallback(() => {
    if (!initLoading && fetchingMore) return <ActivityIndicator />;
    return <View />;
  }, [initLoading, fetchingMore]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marketplace</Text>
      <View style={styles.row}>
        <ScrollView horizontal>
          {categories.map((category) => (
            <CategoryIcon
              key={category.name}
              category={category.name as CategoryType}
              showText
              selected={category.name === selectedCategory}
              onPress={handleChangeCategory}
            />
          ))}
        </ScrollView>
      </View>
      {initLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id + item.name}
          ListEmptyComponent={() => (
            <View style={styles.container}>
              <Text>No products to display</Text>
            </View>
          )}
          onEndReached={fetchMore}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              onRefresh={handlePullRefresh}
              refreshing={initLoading}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: `bold`,
    marginTop: 30,
    marginVertical: 10,
  },
  row: {
    flexDirection: `row`,
    alignItems: `center`,
    marginVertical: 10,
  },
});
