import React, { FC } from "react";
import { TouchableOpacity, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Typography from "components/typography/typography";
import { ACTIVE_OPACITY } from "helpers/constants";
import { IMAGES } from "helpers/images";
import theme from "theme/theme";

import { Menu, ProfileImage, Section, Wrapper } from "./header.styles";

const Header: FC<ViewProps> = ({ ...props }) => {
  return (
    <>
      <SafeAreaView
        edges={["bottom"]}
        style={{
          backgroundColor: theme.colors.white,
        }}
      />
      <Wrapper {...props}>
        <Section>
          <TouchableOpacity activeOpacity={ACTIVE_OPACITY}>
            <Menu type="menu" size={20} />
          </TouchableOpacity>
          <Typography fz="fz20" fw="fw700">
            bagzz
          </Typography>
        </Section>

        <TouchableOpacity activeOpacity={ACTIVE_OPACITY}>
          <ProfileImage resizeMode="contain" source={IMAGES.me} />
        </TouchableOpacity>
      </Wrapper>
    </>
  );
};

export default Header;
