export function getTrackOrder(trackIds, audio_features) {
    let order = [];
    const features = audio_features.map((track) => {
        return [track.danceability, track.energy, track.valence, +(track.tempo/200).toFixed(3), +(track.key/12).toFixed(3), track.instrumentalness, track.acousticness]
    })
    order.push(trackIds.shift());
    let currTrack = features.shift();

    for (let i = 0; i < audio_features.length - 1; i++) {
        let minDiff = Infinity;
        let minDiffIndex = 0;
        for (let j = 0; j < features.length; j++) {
            let diff = trackDiff(currTrack, features[j]);
            if (diff < minDiff) {
                minDiff = diff;
                minDiffIndex = j;
            }
        }

        order.push(trackIds[minDiffIndex]);

        trackIds.splice(minDiffIndex, 1);
        features.splice(minDiffIndex, 1);
    }

    return order;
}

function trackDiff(trackA, trackB) {
    let mse = 0
    for (let i = 0; i < trackA.length; i++) {
        mse += Math.pow(trackA[i] - trackB[i], 2)
    }
    return mse
}

export default getTrackOrder;