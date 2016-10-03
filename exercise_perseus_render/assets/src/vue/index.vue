<template>

  <div id="exercise-container">
    <assessment-wrapper
      v-ref:wrapper
      v-if="exercise"
      :itemId="itemId"
      :masteryModel="exercise.mastery_model"
      :masterySpacingTime="exercise.masterySpacingTime">
      <perseus v-if="item" :item="item"></perseus>
    </assessment-wrapper>
  </div>

</template>


<script>

  module.exports = {
    data: () => ({
      item: undefined,
      exercise: undefined,
      itemId: undefined,
    }),
    methods: {
      setItemId() {
        const items = this.exercise.all_assessment_items;
        const attempts = this.$refs.totalattempts;
        this.itemId = items[attempts % items.length];
        this.$emit('itemIdSet');
      },
      setItemData() {
        this.Kolibri.client(
          `${this.defaultFile.storage_url}/${this.itemId}.json`
          ).then((itemResponse) => {
            const itemData = itemResponse.entity.itemData.replace(
              '${aronsfacehere}',
              this.defaultFile.storage_url);
            this.item = JSON.parse(itemData);
          });
      }
    },
    components: {
      perseus: require('./perseus'),
      assessmentWrapper: require('kolibri/core/vue/components/assessmentWrapper'),
    },
    created() {
      this.Kolibri.client(`${this.defaultFile.storage_url}/exercise.json`).then(
        (exerciseResponse) => {
          this.exercise = exerciseResponse.entity;
          this.$emit('assessmentDataLoaded');
        });
    },
    props: [
      'defaultFile',
    ],
  };

</script>


<style lang="stylus" scoped>

  @require '~core-theme.styl'

  #exercise-container
    border: double 3px grey
    height: 100%
    overflow: auto

</style>

