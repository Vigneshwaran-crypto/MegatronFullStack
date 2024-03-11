import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {textFontFace} from '../../../common/styles';
import {colors} from '../../../common/colors';
import {sSize} from '../../../common/utils';
import {useSelector} from 'react-redux';
import moment from 'moment';

const MsgItem = ({item, index}) => {
  const userDetails = useSelector(({main}) => main.userDetails);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.msgHolder,
          {
            alignSelf:
              userDetails._id === item.senderId ? 'flex-end' : 'flex-start',
            alignItems:
              userDetails._id === item.senderId ? 'flex-end' : 'flex-start',
          },
        ]}>
        <Text style={styles.msgText}>{item.msg}</Text>
        <Text style={styles.dateText}>
          {moment(item.updateAt).format('LT')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    marginVertical: 2,
  },

  msgHolder: {
    flex: 1,
    width: '60%',
    // borderWidth: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f0ffff',
    paddingVertical: 6,
  },
  msgText: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.04,
    // borderWidth: 1,
  },
});

export default MsgItem;
